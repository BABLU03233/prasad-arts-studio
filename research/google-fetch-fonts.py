"""Download this site's typefaces from Google Fonts, keeping source and license."""
from pathlib import Path
import json
import re
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'fonts'
OUT.mkdir(parents=True, exist_ok=True)
CSS_URL = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..600;1,500&family=Manrope:wght@400..700&display=swap'
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=40).read()

css = fetch(CSS_URL).decode('utf-8')
(ROOT / 'research' / 'google-fonts-source.css').write_text(css, encoding='utf-8')
saved = []
for match in re.finditer(r'/\* latin \*/\s*(@font-face\s*\{[^}]+\})', css):
    block = match.group(1)
    family = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    style = re.search(r'font-style:\s*([^;]+)', block).group(1)
    weight = re.search(r'font-weight:\s*([^;]+)', block).group(1)
    url = re.search(r'url\((https://fonts\.gstatic\.com/[^)]+)\)', block).group(1)
    names = {
        ('Cormorant Garamond', 'normal'): 'cormorant-garamond-latin.woff2',
        ('Cormorant Garamond', 'italic'): 'cormorant-garamond-latin-italic.woff2',
        ('Manrope', 'normal'): 'manrope-latin.woff2',
    }
    name = names[(family, style)]
    data = fetch(url)
    if data[:4] != b'wOF2':
        raise RuntimeError(f'{name}: expected WOFF2 signature')
    (OUT / name).write_bytes(data)
    saved.append({'family': family, 'style': style, 'weight': weight, 'filename': name, 'url': url, 'bytes': len(data)})

for family in ('cormorantgaramond', 'manrope'):
    url = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt'
    (OUT / f'{family}-OFL.txt').write_bytes(fetch(url))

if len(saved) != 3:
    raise RuntimeError(f'Expected 3 Latin font files, found {len(saved)}')
(ROOT / 'research' / 'google-fonts-manifest.json').write_text(json.dumps({'cssSource': CSS_URL, 'fonts': saved}, indent=2), encoding='utf-8')
print(json.dumps(saved, indent=2))
