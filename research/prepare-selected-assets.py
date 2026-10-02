"""Produce responsive, unretouched derivatives of reviewed portfolio photos."""
from pathlib import Path
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
selected = [
    ('images-38.jpeg', 'hero/floral-wall-relief', 'Sculpted white flowers with integrated lights on an interior wall', 'No visible third-party watermark; photographed on installation site.'),
    ('images-a6.jpg', 'portfolio/peacock-sculpture', 'Blue and green dimensional peacock sculpture', 'No artist watermark; background shop signage is present.'),
    ('images-15.jpeg', 'portfolio/zebra-sculpture', 'Painted zebra character sculpture surrounded by workshop materials', 'No visible third-party watermark; photographed in workshop.'),
    ('images-26.jpeg', 'portfolio/fairytale-event-stage', 'Fairy characters, oversized flowers and a sculpted tree on a decorated stage', 'No visible third-party watermark; photographed at event installation.'),
    ('images-41.jpeg', 'portfolio/floral-event-installation', 'Large flower arch and fairy sculpture being installed outdoors', 'No visible third-party watermark; installation scene.'),
    ('images-57.jpeg', 'portfolio/devotional-sculpture', 'Colorfully painted devotional sculpture with an unfinished white bull figure', 'No visible third-party watermark; photographed indoors.'),
    ('images-49.jpeg', 'portfolio/ornamental-set-piece', 'Gold-toned ornamental pedestal in a fabrication workshop', 'No visible third-party watermark; workshop scene.'),
    ('images-58.jpeg', 'services/thermocol-eagle', 'Large carved white thermocol eagle head in a workshop', 'No visible third-party watermark; unfinished sculpture in workshop.'),
    ('images-a8.jpg', 'services/canvas-portrait', 'Painted portrait in progress on an easel beside its photographic reference', 'No visible third-party watermark; workshop scene.'),
    ('images-16.jpeg', 'services/landscape-model', 'Detailed miniature landscape model with houses, trees and paths', 'No visible third-party watermark; photographed scale model.'),
    ('images-14.jpeg', 'process/model-making', 'People working on a detailed landscape scale model', 'No visible third-party watermark; do not identify pictured people by name or role.'),
    ('images-logo-2.png', 'logos/original-prasad-arts-logo', 'Original Prasad Arts business logo from its existing website', 'Archived business logo; keep legible and unaltered.'),
]

results = []
for source_name, destination_stem, alt, review in selected:
    source_path = ROOT / 'research' / 'assets-original' / source_name
    destination = ROOT / 'public' / 'images' / destination_stem
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source_path) as im:
        im = ImageOps.exif_transpose(im)
        outputs = []
        widths = sorted(set([min(480, im.width), min(960, im.width), im.width]))
        for width in widths:
            variant = im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS)
            target = destination.with_name(destination.name + f'-{variant.width}w.webp')
            variant.save(target, 'WEBP', quality=86, method=6)
            outputs.append({'path': '/' + str(target.relative_to(ROOT / 'public')).replace('\\', '/'), 'width': variant.width, 'height': variant.height, 'bytes': target.stat().st_size})
        primary = destination.with_suffix('.webp')
        im.save(primary, 'WEBP', quality=86, method=6)
        results.append({'source_original': str(source_path.relative_to(ROOT)).replace('\\', '/'), 'source_url': 'https://www.prasadartsthermocol3dworks.com/' + source_name.replace('images-', 'images/', 1), 'public_path': '/' + str(primary.relative_to(ROOT / 'public')).replace('\\', '/'), 'width': im.width, 'height': im.height, 'alt': alt, 'review': review, 'variants': outputs})

(ROOT / 'public' / 'images' / 'about').mkdir(exist_ok=True)
(ROOT / 'research' / 'selected-assets.json').write_text(json.dumps({'review_date': '2026-10-02', 'scope': 'Visual inspection only: no visible third-party watermark in selected photographs. Publication on source website does not independently verify authorship.', 'assets': results}, indent=2), encoding='utf-8')
print(f'Prepared {len(results)} selected images and {sum(len(x["variants"]) for x in results)} responsive derivatives.')
