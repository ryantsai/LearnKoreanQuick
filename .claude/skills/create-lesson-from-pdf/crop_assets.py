#!/usr/bin/env python3
"""Crop lesson image assets from a "L2-x PDF Viewer.pdf" into public/assets/course-lessons/.

Usage:
    python crop_assets.py "docs/lessons/L2-7PDF Viewer.pdf" l2-7

The fractional crop boxes below match the standard Gjun/ABC Online lesson template:
title slide (1), 情境對話 (3), 相關單字學習 photo grids (4-6), 句型教學 (8), 對話練習 (11).
They are a STARTING POINT. After running, open each PNG with the Read tool and tweak the
boxes for the specific deck until every subject is well framed. Page layouts drift slightly
between lessons, so always eyeball the output before committing.

Requires: PyMuPDF (fitz), Pillow.
"""
import io
import os
import sys

import fitz  # PyMuPDF
from PIL import Image

ZOOM = 3.0  # render scale; 3x gives crisp crops on the ~842x595pt landscape pages


def main(pdf_path: str, lesson_id: str) -> None:
    out_dir = os.path.join("public", "assets", "course-lessons")
    os.makedirs(out_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    mat = fitz.Matrix(ZOOM, ZOOM)
    cache: dict[int, Image.Image] = {}

    def page(p: int) -> Image.Image:
        if p not in cache:
            pix = doc[p].get_pixmap(matrix=mat)
            cache[p] = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        return cache[p]

    def crop(p: int, frac: tuple[float, float, float, float], name: str) -> None:
        im = page(p)
        w, h = im.size
        l, t, r, b = frac
        box = (int(l * w), int(t * h), int(r * w), int(b * h))
        im.crop(box).save(os.path.join(out_dir, f"{lesson_id}-{name}.png"))
        print(f"{lesson_id}-{name}.png  <- page {p + 1}  {box}")

    # --- headline / dialogue images (page indices are 0-based) ---
    crop(0, (0.50, 0.04, 0.93, 0.97), "dialogue-person")   # title slide model -> also hero
    crop(2, (0.12, 0.58, 0.47, 0.93), "dialogue-object")   # 情境對話 supporting photo
    crop(10, (0.09, 0.17, 0.37, 0.93), "practice-person")  # 對話練習 model
    crop(7, (0.10, 0.17, 0.93, 0.96), "practice-visual")   # 句型教學 chart

    # --- vocab photo grids: pages 4/5/6 (idx 3/4/5), left/center/right thirds ---
    thirds = [(0.07, 0.34), (0.37, 0.63), (0.66, 0.93)]
    grid = {3: (1, 2, 3), 4: (4, 5, 6), 5: (7, 8, 9)}
    for pidx, nums in grid.items():
        for (lx, rx), n in zip(thirds, nums):
            crop(pidx, (lx, 0.27, rx, 0.61), f"vocab-{n:02d}")

    # --- remaining vocab (e.g. sentence-pattern words) often live on the 句型教學 slide ---
    crop(7, (0.18, 0.55, 0.46, 0.97), "vocab-10")
    crop(7, (0.52, 0.55, 0.80, 0.97), "vocab-11")
    crop(7, (0.10, 0.26, 0.33, 0.52), "vocab-12")

    print("\nDone. Now open each PNG with Read and adjust boxes as needed.")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
