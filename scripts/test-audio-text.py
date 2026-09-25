"""Check lesson date readings and avoid pronouncing exercise blank markers."""
import runpy
from pathlib import Path
spoken_text=runpy.run_path(str(Path(__file__).with_name('generate-local-audio.py')))['spoken_text']
cases={
    '손톱깎이':'손톱까끼.',
    '일일':'이릴.',
    '16일에 갑니다.':'십육일에 갑니다.',
    '6월 10일':'유월 십일.',
    '10월 5일':'시월 오일.',
    '4월 15일':'사월 십오일.',
    '2월 14일에':'이월 십사일에.',
    '3/27 → ____________________':'삼월 이십칠일.',
    '네, ____________________.':'네.',
    '동대문은 을지로 6가 근처에 있어요.':'동대문은 을지로 육가 근처에 있어요.',
}
for text,expected in cases.items():
    actual=spoken_text({'text':text,'lang':'ko-KR'})
    assert actual==expected, (text,actual,expected)
print(f'{len(cases)} pronunciation input checks passed.')
