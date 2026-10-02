"""Read the supplied public GBP and save research evidence; never signs in."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
import re

ROOT = Path(__file__).resolve().parent
URL = 'https://share.google/pisOnEZ5HPKDrzKxL'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, channel='chrome')
    page = browser.new_page(viewport={"width": 1440, "height": 1000}, locale='en-IN')
    page.goto(URL, wait_until='domcontentloaded', timeout=45000)
    page.wait_for_timeout(5000)
    body_text = page.locator('body').inner_text()
    captcha_blocked = 'unusual traffic' in body_text.lower()
    evidence = {
        'requestedUrl': URL,
        'resolvedUrl': re.sub(r'/sorry/.*', '/sorry/[challenge details omitted]', page.url),
        'title': page.title(),
        'blocked': captcha_blocked,
        'text': 'Google unusual traffic CAPTCHA; stopped without bypass.' if captcha_blocked else body_text,
        'links': [] if captcha_blocked else page.locator('a').evaluate_all('(els) => els.map(a => ({text:a.innerText,url:a.href}))'),
        'images': [] if captcha_blocked else page.locator('img').evaluate_all('(els) => els.map(a => ({alt:a.alt,url:a.currentSrc || a.src}))'),
    }
    (ROOT / 'google-browser-evidence.json').write_text(json.dumps(evidence, indent=2), encoding='utf-8')
    if not captcha_blocked:
        (ROOT / 'google-browser-profile.html').write_text(page.content(), encoding='utf-8')
        page.screenshot(path=str(ROOT / 'google-browser-profile.png'), full_page=True)
    print(json.dumps(evidence, indent=2))
    browser.close()
