"""Generate/resume static Qwen3-TTS audio on the local GPU; no hosted API."""
import argparse, hashlib, json, re, time
from pathlib import Path
import numpy as np
import soundfile as sf
import torch
from faster_qwen3_tts import FasterQwen3TTS
from opencc import OpenCC
CHINESE_INPUT = OpenCC("t2s")

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/audio'
MODEL = 'Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice'
STYLE = {'ko-KR': 'Speak warmly and naturally, with clear pronunciation.', 'zh-TW': '用标准普通话清晰、自然地说话。'}
CONSONANTS = dict(zip('ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ', ['기역','쌍기역','니은','디귿','쌍디귿','리을','미음','비읍','쌍비읍','시옷','쌍시옷','이응','지읒','쌍지읒','치읓','키읔','티읕','피읖','히읗']))
VOWELS = dict(zip('ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ', '아애야얘어에여예오와왜외요우워웨위유으의이'))
# Explicit liaison avoids the model confusing the noun 깎이 with the verb 깎기.
# https://www.korean.go.kr/nkview/nknews/200312/65_3.html
# https://krdict.korean.go.kr/eng/dicSearch/SearchView?ParaWordNo=72828
PRONUNCIATION = {'손톱깎이':'손톱까끼', '일일':'이릴', '내일 몇 시에 회사(학교)에 갑니까?':'내일 몇 시에 회사에 갑니까?'}
def spoken_text(entry):
    text = entry['text']
    if entry['lang']=='ko-KR' and re.fullmatch(r'네[,\s_.。]+', text):
        return '네.'
    if entry['lang'] == 'ko-KR':
        text = PRONUNCIATION.get(text, CONSONANTS.get(text, VOWELS.get(text, text)))
        months = ['일월','이월','삼월','사월','오월','유월','칠월','팔월','구월','시월','십일월','십이월']
        def day(number):
            n = int(number)
            digits = ['', '일','이','삼','사','오','육','칠','팔','구']
            return (('' if n < 10 else (digits[n//10] if n >= 20 else '') + '십') + digits[n%10]) + '일'
        text = re.sub(r'(?<!\d)(1[0-2]|[1-9])/(3[01]|[12]\d|[1-9])(?!\d)', lambda m: months[int(m[1])-1] + ' ' + day(m[2]), text)
        text = re.sub(r'(?<!\d)(1[0-2]|[1-9])월', lambda m: months[int(m[1])-1], text)
        text = re.sub(r'(?<!\d)(3[01]|[12]\d|[1-9])일', lambda m: day(m[1]), text)
        text = re.sub(r'_{2,}', '', text)
        text = text.replace('↔', ', ').replace('→', ', ').replace('|', ', ')
        text = re.sub(r'[\s,]+([.!?]?)$', r'\1', text)
    else:
        text = CHINESE_INPUT.convert(text)
    if not re.search(r'[.!?。！？]$', text): text += '.'
    return text

def atomic_replace(source, destination):
    # Windows indexers and the development server can briefly hold the old file.
    for attempt in range(10):
        try:
            source.replace(destination)
            return
        except PermissionError:
            if attempt == 9: raise
            time.sleep(.1 * (attempt + 1))


def valid_file(path):
    try:
        info=sf.info(path)
        return info.frames > info.samplerate * .12
    except (RuntimeError, OSError):
        return False

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--batch-size',type=int,default=1)
    ap.add_argument('--limit',type=int,default=0)
    ap.add_argument('--lessons', nargs='+', help='Only generate clips used by these lesson IDs')
    ap.add_argument('--force', action='store_true', help='Regenerate selected clips even if already present')
    ap.add_argument('--keys-file', type=Path, help='JSON array of clip keys to regenerate')
    ap.add_argument('--seed',type=int,default=90809)
    ap.add_argument('--standard-engine', action='store_true', help='Use the original model decoder for pronunciation review retries')
    args=ap.parse_args()
    if args.batch_size < 1 or args.limit < 0: ap.error("batch-size must be positive and limit cannot be negative")
    if not torch.cuda.is_available(): raise RuntimeError('CUDA GPU required. Install the cu128 PyTorch wheels.')
    torch.set_num_threads(1)
    torch.manual_seed(args.seed)
    import sys
    (ROOT/'tmp').mkdir(exist_ok=True)
    sys.stdout = open(ROOT/'tmp/audio-generation.log', 'a', encoding='utf-8', buffering=1)
    sys.stderr = open(ROOT/'tmp/audio-generation.err.log', 'a', encoding='utf-8', buffering=1)
    catalog=json.loads((OUT/'catalog.json').read_text(encoding='utf-8'))['entries']
    fingerprint=hashlib.sha256(json.dumps({'model': MODEL,'style':STYLE,'version':3},sort_keys=True,ensure_ascii=False).encode()).hexdigest()
    manifest_path=OUT/'manifest.json'
    manifest=json.loads(manifest_path.read_text(encoding='utf-8')) if manifest_path.exists() else {}
    if manifest and manifest.get('fingerprint') != fingerprint:
        raise RuntimeError('Voice settings changed. Use a new output directory instead of mixing voices.')
    manifest.update(version=1,model=MODEL,revision='0c0e3051f131929182e2c023b9537f8b1c68adfe',engine='faster-qwen3-tts 0.4.0',fingerprint=fingerprint,speakers={'ko-KR':'Sohee','zh-TW':'Serena'})
    valid_keys={e['key'] for e in catalog}
    manifest['clips']={k:v for k,v in manifest.get('clips',{}).items() if k in valid_keys}
    clips=manifest['clips']
    selected=[e for e in catalog if not args.lessons or set(args.lessons).intersection(e.get('lessons', []))]
    if args.keys_file:
        requested=set(json.loads(args.keys_file.read_text(encoding='utf-8')))
        selected=[e for e in selected if e['key'] in requested]
        if requested - {e['key'] for e in selected}: raise ValueError('Some requested clip keys do not exist in the selected catalog.')
    if args.lessons and not selected: raise ValueError('No clips match the requested lessons; rebuild the catalog.')
    pending=[e for e in selected if args.force or e['key'] not in clips or not valid_file(OUT/e['file'])]
    if args.limit: pending=pending[:args.limit]
    print(f'Generating {len(pending)} clips; {len(clips)} already ready.',flush=True)
    if not pending: return
    model=FasterQwen3TTS.from_pretrained(str(ROOT/'.models/qwen3-tts-1.7b'),device='cuda',dtype=torch.bfloat16,attn_implementation='sdpa')
    started=time.time()
    def save_manifest():
        manifest['totalExpected']=len(catalog)
        manifest['complete']=all(e['key'] in clips for e in catalog)
        manifest['peakGpuGB']=round(torch.cuda.max_memory_allocated()/1e9,3)
        temp=manifest_path.with_suffix('.tmp')
        temp.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        atomic_replace(temp, manifest_path)
    failures=[]
    def generate(batch):
        for entry in batch:
            text=spoken_text(entry)
            length=len(re.sub(r"[^가-힣一-鿿0-9A-Za-z]", "", text))
            max_duration=max(2.4, 1.5+length*.42)
            if entry['lang']=='zh-TW' and re.search(r'[가-힣ㄱ-ㅎㅏ-ㅣ]', text):
                # Spoken arrows/plus signs and switching languages take extra time.
                max_duration += 1.0 + len(re.findall(r'[→↔+]', text)) * .8
            max_tokens=min(2048,max(48,int((max_duration+2)*12)))
            style=STYLE[entry['lang']] if entry['lang']=='zh-TW' or length > 12 else ''
            if entry['lang']=='ko-KR' and args.standard_engine:
                style='Speak slowly and clearly, pronouncing every syllable accurately.'
            last_error=None
            for attempt in range(4):
                try:
                    with torch.inference_mode():
                        engine=model if attempt < 3 and not args.standard_engine else model.model
                        result,sr=engine.generate_custom_voice(
                            text=text,
                            language='Korean' if entry['lang']=='ko-KR' else 'Chinese',
                            speaker=manifest['speakers'][entry['lang']],
                            instruct=style,
                            max_new_tokens=max_tokens,temperature=.7,repetition_penalty=1.05 if entry['lang']=='zh-TW' else 1.15,
                        )
                    wav=np.asarray(result[0],dtype=np.float32)
                    duration=len(wav)/sr
                    if not np.isfinite(wav).all() or duration < .18 or np.max(np.abs(wav)) < .002:
                        raise ValueError('Invalid or silent waveform')
                    if duration > max_duration:
                        raise ValueError(f'Excess speech ({duration:.2f}s > {max_duration:.2f}s)')
                    active=np.flatnonzero(np.abs(wav)>.003)
                    if len(active):
                        pad=int(sr*.12);wav=wav[max(0,active[0]-pad):min(len(wav),active[-1]+pad)]
                    # Normalize speech energy, rather than making every transient peak equally loud.
                    peak=np.max(np.abs(wav))
                    speech=wav[np.abs(wav) > peak * .05]
                    rms=float(np.sqrt(np.mean(speech**2)))
                    wav=wav*min(.12/rms, .9/peak)
                    dest=OUT/entry['file'];temp=dest.with_suffix('.tmp')
                    sf.write(temp,wav,sr,format='MP3',bitrate_mode='CONSTANT')
                    if not valid_file(temp): raise ValueError('Invalid MP3')
                    atomic_replace(temp, dest)
                    clips[entry['key']]={'file':entry['file'],'duration':round(len(wav)/sr,3),
                        'revision':hashlib.sha256(dest.read_bytes()).hexdigest()[:16], 'spokenText':text,
                        'normalization':'speech-rms-0.12-peak-0.9'}
                    break
                except (ValueError, RuntimeError, OSError) as error:
                    last_error=str(error)
                    print(f'Retry {attempt+1}: {entry["key"]}: {last_error}',flush=True)
            else:
                failures.append({'key':entry['key'],'error':last_error})
                (OUT/'failures.json').write_text(json.dumps(failures,ensure_ascii=False,indent=2),encoding='utf-8')
            save_manifest()
    for start in range(0,len(pending),args.batch_size):
        generate(pending[start:start+args.batch_size])
        count=min(start+args.batch_size,len(pending))
        elapsed=time.time()-started
        if count % 25 == 0 or count == len(pending):
            print(f'{count}/{len(pending)} generated; total {len(clips)}/{len(catalog)}; {elapsed:.0f}s; GPU peak {torch.cuda.max_memory_allocated()/1e9:.2f} GB',flush=True)
    save_manifest()
    (OUT/'failures.json').write_text(json.dumps(failures,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    if failures: raise RuntimeError(f'{len(failures)} clips failed; see public/audio/failures.json and rerun to retry.')

if __name__=='__main__':
    from filelock import FileLock
    with FileLock(str(ROOT/'.tts-generation.lock'), timeout=0):
        main()
