"""Decode every catalog recording and report structural audio problems."""
from pathlib import Path
import json
import numpy as np
import soundfile as sf

root=Path(__file__).resolve().parents[1]/'public/audio'
catalog=json.loads((root/'catalog.json').read_text(encoding='utf-8'))['entries']
manifest=json.loads((root/'manifest.json').read_text(encoding='utf-8'))
errors=[]
seconds=0
for entry in catalog:
    try:
        clip=manifest['clips'][entry['key']]
        wav,sr=sf.read(root/clip['file'],dtype='float32')
        if wav.ndim != 1 or sr != 24000: raise ValueError('Unexpected channel count/sample rate')
        if not np.isfinite(wav).all(): raise ValueError('Non-finite waveform')
        if len(wav)/sr < .12 or np.max(np.abs(wav)) < .002: raise ValueError('Silent or empty waveform')
        if abs(len(wav)/sr-clip['duration']) > .12: raise ValueError('Duration disagrees with manifest')
        seconds+=len(wav)/sr
    except (KeyError,ValueError,RuntimeError,OSError) as error:
        errors.append({'key':entry['key'],'error':str(error)})
report={'expected':len(catalog),'decoded':len(catalog)-len(errors),'audioMinutes':round(seconds/60,2),'errors':errors}
(root/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({**report,'errors':errors[:10]},ensure_ascii=False))
raise SystemExit(bool(errors))
