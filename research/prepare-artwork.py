"""Prepare curated, optimised artwork from the archived existing-website photos.

Each source is an authentic photo already present on the business's own website
(archived under research/assets-original/). Processing is deliberately gentle:
a light auto-contrast and a whisper of colour/sharpness so the handmade white
sculptures read clearly on screen, with no content changes, no watermark removal,
and never any upscaling beyond the original resolution.

Run: python research/prepare-artwork.py
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "research" / "assets-original"
OUT = ROOT / "public" / "images"

# source stem -> (output folder/name, [crop box or None], gentle|soft)
# crop box is (left, top, right, bottom) as fractions of w/h, applied before resize.
JOBS = [
    # Sculptures & 3D
    ("images-30.jpeg",  "portfolio/nandi-sculpture",      None),
    ("images-32.jpeg",  "portfolio/metal-skull",          (0.02, 0.0, 0.98, 1.0)),
    # Wall reliefs
    ("images-24.jpeg",  "portfolio/buddha-relief",        None),
    ("images-8.jpeg",   "portfolio/rose-mural-relief",    None),
    ("images-25.jpeg",  "portfolio/feather-relief",       None),
    ("images-6.jpeg",   "portfolio/rose-relief",          None),
    ("images-22.jpeg",  "portfolio/peacock-om-relief",    None),
    ("images-a7.jpg",   "portfolio/birds-wood-relief",    None),
    # Devotional
    ("images-17.jpeg",  "portfolio/nandi-painted",        None),
    ("images-a4.jpg",   "portfolio/krishna-radha-mural",  None),
    ("images-7.jpeg",   "portfolio/krishna-flute-relief", None),
    # Murals & paint
    ("images-46.jpeg",  "portfolio/lotus-mural",          None),
    ("images-45.jpeg",  "portfolio/bamboo-mural",         None),
    ("images-50.jpeg",  "portfolio/landscape-arch-mural", None),
    ("images-3.jpeg",   "portfolio/colosseum-wood-art",   None),
    # Events & sets
    ("images-1.jpeg",   "portfolio/birthday-castle-stage",None),
    ("images-48.jpeg",  "portfolio/first-birthday-stage", None),
    # Process (making-of)
    ("images-a9.jpg",   "process/wall-texturing",         None),
    ("images-16.jpeg",  "process/landscape-model",        None),
]

WIDTHS = [480, 960, 1440]


def tone(img: Image.Image) -> Image.Image:
    img = ImageOps.exif_transpose(img).convert("RGB")
    # Gentle per-channel autocontrast to lift flat workshop lighting.
    img = ImageOps.autocontrast(img, cutoff=0.4, preserve_tone=True)
    img = ImageEnhance.Color(img).enhance(1.04)
    img = ImageEnhance.Contrast(img).enhance(1.03)
    return img


def encode(img: Image.Image, base: Path, w0: int, h0: int):
    base.parent.mkdir(parents=True, exist_ok=True)
    widths = sorted({w for w in WIDTHS if w <= w0} | {min(w0, max(WIDTHS))})
    saved = []
    for w in widths:
        h = round(h0 * w / w0)
        v = img.resize((w, h), Image.LANCZOS)
        # Mild output sharpening after downscale.
        v = ImageEnhance.Sharpness(v).enhance(1.08)
        v.save(base.with_name(f"{base.name}-{w}w.webp"), "WEBP", quality=82, method=6)
        saved.append(w)
    # Base file = largest variant, used as the plain-src fallback.
    big = max(widths)
    hb = round(h0 * big / w0)
    img.resize((big, hb), Image.LANCZOS).save(base.with_suffix(".webp"), "WEBP", quality=84, method=6)
    return saved, (big, hb)


manifest = []
for stem, dest, crop in JOBS:
    src = SRC / stem
    if not src.exists():
        print("MISSING", src)
        continue
    img = tone(Image.open(src))
    if crop:
        w, h = img.size
        l, t, r, b = crop
        img = img.crop((round(l * w), round(t * h), round(r * w), round(b * h)))
    w0, h0 = img.size
    base = OUT / dest
    widths, (bw, bh) = encode(img, base, w0, h0)
    manifest.append((dest, bw, bh, widths))
    print(f"{stem:20s} -> {dest:34s} {bw}x{bh}  widths={widths}")

print("\n// data.js image map entries:")
for dest, bw, bh, widths in manifest:
    print(f"  '{dest.split('/')[-1]}': ['{dest}', {bw}, {bh}, {widths}],")
