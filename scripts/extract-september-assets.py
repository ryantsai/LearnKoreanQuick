"""Extract the illustrations used by the September lessons from their source PDFs."""
from pathlib import Path
import pymupdf
from PIL import Image

OUT = Path('public/assets/course-lessons')
OUT.mkdir(parents=True, exist_ok=True)
def slide(doc, page):
    p = doc[page - 1]
    r = p.rect
    pix = p.get_pixmap(matrix=pymupdf.Matrix(3, 3), clip=pymupdf.Rect(0, r.height * .21, r.width, r.height * .79))
    return Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
def crop(im, box, name):
    w, h = im.size
    im.crop(tuple(round(v * (w if i % 2 == 0 else h)) for i, v in enumerate(box))).save(OUT / f'{name}.png')
for name, lesson in [('0908', 'b1-15'), ('0909', 'b1-16')]:
    doc = pymupdf.open(f'docs/lessons/new/{name}.pdf')
    im = slide(doc, 13)
    if name == '0908':
        crop(im, (.76, .19, .99, .76), f'{lesson}-dialogue-person')
        crop(im, (.015, .23, .31, .76), f'{lesson}-dialogue-object')
        crop(slide(doc, 14), (.01, .25, .33, .58), f'{lesson}-practice-person')
        crop(slide(doc, 11), (.035, .27, .94, .91), f'{lesson}-vocab-page')
        for page in [8, 9]:
            im = slide(doc, page)
            for j, box in enumerate([(.055,.17,.345,.445),(.365,.17,.635,.445),(.66,.17,.94,.445),(.055,.56,.345,.82),(.365,.56,.635,.82),(.66,.56,.94,.82)]):
                crop(im, box, f'{lesson}-vocab-{(page-8)*6+j+1:02}')
    else:
        crop(im, (.015, .18, .235, .68), f'{lesson}-dialogue-person')
        crop(im, (.68, .56, .99, .9), f'{lesson}-dialogue-object')
        crop(slide(doc, 14), (.025, .23, .23, .97), f'{lesson}-practice-person')
        crop(slide(doc, 8), (.085, .24, .97, .9), f'{lesson}-vocab-page')
