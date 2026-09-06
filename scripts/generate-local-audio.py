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
def spoken_text(entry):
    text = entry['text']
    if entry['lang']=='ko-KR' and re.fullmatch(r'네[,\s_.。]+', text):
        return '네.'
    if entry['lang'] == 'ko-KR':
        text = CONSONANTS.get(text, VOWELS.get(text, text))
        text = re.sub(r'_{2,}', ' … ', text)
        text = text.replace('↔', ', ').replace('→', ', ').replace('|', ', ')
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
    args=ap.parse_args()
    if args.batch_size < 1 or args.limit < 0: ap.error("batch-size must be positive and limit cannot be negative")
    if not torch.cuda.is_available(): raise RuntimeError('CUDA GPU required. Install the cu128 PyTorch wheels.')
    torch.set_num_threads(1)
    torch.manual_seed(90809)
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
    pending=[e for e in catalog if e['key'] not in clips or not valid_file(OUT/e['file'])]
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
            last_error=None
            for attempt in range(4):
                try:
                    with torch.inference_mode():
                        engine=model if attempt < 3 else model.model
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
                    peak=np.max(np.abs(wav));wav=wav*min(.95/peak,2.0)
                    dest=OUT/entry['file'];temp=dest.with_suffix('.tmp')
                    sf.write(temp,wav,sr,format='MP3',bitrate_mode='CONSTANT')
                    if not valid_file(temp): raise ValueError('Invalid MP3')
                    atomic_replace(temp, dest)
                    clips[entry['key']]={'file':entry['file'],'duration':round(len(wav)/sr,3)}
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
