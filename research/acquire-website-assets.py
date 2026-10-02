"""Archive public portfolio images from the business's existing website."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin, urlparse
import hashlib
import json
import re
import requests
from bs4 import BeautifulSoup
from PIL import Image, ImageOps, ImageDraw

BASE = 'https://www.prasadartsthermocol3dworks.com/'
ROOT = Path(__file__).resolve().parents[1]
RESEARCH = ROOT / 'research'
ORIGINALS = RESEARCH / 'assets-original'
PUBLIC = RESEARCH / 'website-webp-archive'
PAGES = RESEARCH / 'website-pages'
for directory in [ORIGINALS, PUBLIC, PAGES]:
    directory.mkdir(parents=True, exist_ok=True)

def get(url):
    response = requests.get(url, timeout=45)
    response.raise_for_status()
    return response

home = get(BASE)
soup = BeautifulSoup(home.text, 'html.parser')
links = {BASE}
for element in soup.select('a[href]'):
    u = urljoin(BASE, element['href'])
    if urlparse(u).netloc == urlparse(BASE).netloc and urlparse(u).path.endswith('.php'):
        links.add(u.split('#')[0])

def parse_page(url):
    try:
        response = home if url == BASE else get(url)
        name = urlparse(url).path.strip('/').replace('/', '-') or 'home.html'
        (PAGES / name).write_text(response.text, encoding='utf-8')
        parsed = BeautifulSoup(response.text, 'html.parser')
        page_images = set()
        for element in parsed.select('[src], a[href], [style]'):
            for attr in ['src', 'href']:
                value = element.get(attr, '')
                if re.search(r'\.(?:jpg|jpeg|png|webp)(?:\?|$)', value, re.I):
                    page_images.add(urljoin(url, value))
            for value in re.findall(r'url\([\"\']?([^\"\')]+)', element.get('style', '')):
                if re.search(r'\.(?:jpg|jpeg|png|webp)', value, re.I):
                    page_images.add(urljoin(url, value))
        print(f'Page {url}: {len(page_images)} images', flush=True)
        return {'url': url, 'title': parsed.title.get_text(' ', strip=True) if parsed.title else '', 'text': parsed.get_text(' ', strip=True), 'images': sorted(page_images)}
    except Exception as exc:
        return {'url': url, 'error': str(exc)}

with ThreadPoolExecutor(max_workers=6) as executor:
    pages = list(executor.map(parse_page, sorted(links)))
image_sources = {}
for page in pages:
    for url in page.get('images', []):
        image_sources.setdefault(url, []).append(page['url'])

def download_image(item):
    url, source_pages = item
    relative_path = urlparse(url).path.strip('/')
    name = relative_path.replace('/', '-')
    destination = ORIGINALS / name
    record = {'source_url': url, 'source_pages': source_pages, 'original_path': str(destination.relative_to(ROOT)).replace('\\', '/')}
    try:
        data = get(url).content
        destination.write_bytes(data)
        record.update({'sha256': hashlib.sha256(data).hexdigest(), 'original_bytes': len(data)})
        with Image.open(destination) as source:
            source = ImageOps.exif_transpose(source)
            record.update({'width': source.width, 'height': source.height})
            source.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
            optimized_name = 'website-' + Path(name).stem + '.webp'
            optimized_path = PUBLIC / optimized_name
            source.save(optimized_path, 'WEBP', quality=86, method=6)
            record.update({'optimized_path': str(optimized_path.relative_to(ROOT)).replace('\\', '/'), 'optimized_bytes': optimized_path.stat().st_size})
        print(f'Image {name}: {record["width"]}x{record["height"]}', flush=True)
    except Exception as exc:
        record['error'] = str(exc)
    return record

with ThreadPoolExecutor(max_workers=6) as executor:
    images = list(executor.map(download_image, sorted(image_sources.items())))
manifest = {'source_website': BASE, 'retrieved_date': '2026-10-02', 'pages': pages, 'images': images}
(RESEARCH / 'website-assets.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding='utf-8')
good = [item for item in images if item.get('width', 0) > 250 and item.get('height', 0) > 200]
for start in range(0, len(good), 30):
    subset = good[start:start + 30]
    sheet = Image.new('RGB', (1200, ((len(subset) + 4) // 5) * 200), 'white')
    draw = ImageDraw.Draw(sheet)
    for i, item in enumerate(subset):
        tile = Image.open(ROOT / item['optimized_path']).convert('RGB')
        tile.thumbnail((232, 166))
        x, y = (i % 5) * 240, (i // 5) * 200
        sheet.paste(tile, (x + (240 - tile.width) // 2, y))
        label = Path(item['original_path']).name.replace('images-', '')
        draw.text((x + 4, y + 168), label[:35], fill='black')
        draw.text((x + 4, y + 183), f'{item["width"]} x {item["height"]}', fill='black')
    sheet.save(RESEARCH / f'website-contact-sheet-{start // 30 + 1}.jpg', quality=90)
print(json.dumps({'pages': len(pages), 'images': len(images), 'downloaded': sum('error' not in x for x in images)}), flush=True)
