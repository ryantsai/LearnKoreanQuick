"""Decode every catalog recording and report structural audio problems."""
from pathlib import Path
import json, hashlib
import numpy as np
import soundfile as sf

root=Path(__file__).resolve().parents[1]/'public/audio'
catalog=json.loads((root/'catalog.json').read_text(encoding='utf-8'))['entries']
manifest=json.loads((root/'manifest.json').read_text(encoding='utf-8'))
errors=[]
seconds=0
normalized_levels=[]
for entry in catalog:
    try:
        clip=manifest['clips'][entry['key']]
        wav,sr=sf.read(root/clip['file'],dtype='float32')
        if wav.ndim != 1 or sr != 24000: raise ValueError('Unexpected channel count/sample rate')
        if not np.isfinite(wav).all(): raise ValueError('Non-finite waveform')
        if len(wav)/sr < .12 or np.max(np.abs(wav)) < .002: raise ValueError('Silent or empty waveform')
        if abs(len(wav)/sr-clip['duration']) > .12: raise ValueError('Duration disagrees with manifest')
        if clip.get('revision') and hashlib.sha256((root/clip['file']).read_bytes()).hexdigest()[:16] != clip['revision']:
            raise ValueError('Content revision disagrees with recording')
        if clip.get('normalization') == 'speech-rms-0.12-peak-0.9':
            peak=np.max(np.abs(wav))
            rms=float(np.sqrt(np.mean(wav[np.abs(wav)>peak*.05]**2)))
            if not .09 <= rms <= .15: raise ValueError('Speech volume outside normalized range')
            normalized_levels.append(rms)
        seconds+=len(wav)/sr
    except (KeyError,ValueError,RuntimeError,OSError) as error:
        errors.append({'key':entry['key'],'error':str(error)})
report={'expected':len(catalog),'decoded':len(catalog)-len(errors),'audioMinutes':round(seconds/60,2),'errors':errors}
if normalized_levels:
    report['normalizedClips']=len(normalized_levels)
    report['speechVolumeSpreadDb']=round(float(20*np.log10(max(normalized_levels)/min(normalized_levels))),3)
(root/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({**report,'errors':errors[:10]},ensure_ascii=False))
raise SystemExit(bool(errors))
