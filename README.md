# Prasad Arts — Thermocol 3D Works

An art-led, responsive portfolio and enquiry website for Prasad Arts in Hyderabad. Built with React, Vite, and CSS. Business photographs are preserved with source manifests in `research/`.

## Development

Requires Node.js 22 or newer. On Windows PowerShell use `npm.cmd` if execution policy blocks `npm.ps1`.

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Contact source of truth

- User-confirmed phone and WhatsApp: **+91 90597 16009**. This takes precedence over the older number in the attached brief and is also listed on the existing website.
- Existing website: https://www.prasadartsthermocol3dworks.com/
- Google profile supplied by owner: https://share.google/pisOnEZ5HPKDrzKxL
- Existing website address: Plot No.283, SY.No.1007, Kukatpally, Hyderabad - 500072, Telangana.
- Existing website email: prasadbabu19800@gmail.com.
- Unverified reviews, star ratings, awards, counts, and working hours must not be invented.

# Website Update Log

## 2026-10-02

### Update 1 — Research and foundation

#### Changes
- Reviewed the supplied brief and inspected the empty workspace.
- Began parallel research of the existing website and Google business listing, including original photo acquisition.
- Set up a lightweight React/Vite project and a shared visual direction: ivory, charcoal, brass, editorial serif typography, and authentic art photography.
- Adopted the user's latest phone number consistently.

#### Files Changed
- `package.json`, `vite.config.js`, `.gitignore`, `README.md`.
- Source research and asset manifests will be maintained in `research/`.

#### Why
Establish accurate business content and a maintainable base before designing the gallery and lead flow.

#### Testing
- Confirmed Node.js 24 and npm availability.
- Production and browser tests pending implementation.

#### Known Issues
- Google photo access still being investigated; a complete photo export is not yet verified.
- The installed Design Code skill references adapters and verification scripts that are absent from its directory. Equivalent project-level checks will be used and reported honestly.

### Update 2 — Artwork, editorial design, and lead flow

#### Changes
- Built the art-led homepage, responsive sticky navigation, asymmetric filterable portfolio, keyboard-accessible native-dialog lightbox, service accordions, studio story, scroll-progress process, FAQ, contact area, and editorial footer.
- Added persistent desktop call/WhatsApp actions and a mobile call/WhatsApp/enquiry bar.
- Implemented the user-approved WhatsApp enquiry flow: validation, local message preparation, review, explicit WhatsApp handoff, edit, and call fallback.
- Added optional date/location/budget/contact details and a local reference-image preview with clear manual-attachment instructions.
- Added self-hosted licensed fonts, restrained motion, reduced-motion support, a motion pause control, semantic navigation, focus handling, local-business metadata, canonical URL, social previews, robots, and sitemap.
- Recovered 80 image URLs (79 unique files) from the existing website; excluded visibly third-party-watermarked photographs from featured selections. Retained originals and provenance.
- Verified the supplied Google link resolves to the named business; Google stopped further access with an unusual-traffic CAPTCHA. No Google photos, rating, reviews, or hours were fabricated.

#### Files Changed
- `src/App.jsx`, `src/main.jsx`, `src/styles.css`, `src/data.js`.
- `src/components/Modal.jsx`, `src/components/EnquiryForm.jsx`, `src/components/enquiry.css`, `src/lib/enquiry.mjs`.
- `index.html`, `public/favicon.svg`, `public/robots.txt`, `public/sitemap.xml`.
- `public/fonts/`, `public/images/`, `research/`, `tests/enquiry.test.mjs`, `package-lock.json`, `README.md`.

#### Why
Make artwork the focus while giving visitors clear, fast routes to discuss a real project with the business.

#### Testing
- Dependency installation complete: 0 reported npm vulnerabilities at installation.
- Enquiry helper tests: 7 passed, including validation, encoding, and image constraints.
- Integrated browser and build checks pending; will be recorded after execution.

#### Known Issues
- A complete Google photo download is blocked by Google's CAPTCHA. See `research/google-business-profile.md`.
- WhatsApp requires visitors to press Send and attach reference images themselves; the site never claims an enquiry was received before this.
- No backend inbox or email sending is configured, in line with the user's WhatsApp-only delivery choice.

### Update 3 — Requested image enhancement and asset curation

#### Changes
- Used the built-in Imagegen edit tool to create a neutral studio presentation of the existing eagle sculpture, preserving its recognisable carved form and thermocol texture. Kept the original workshop photo in the portfolio.
- Added an unobtrusive “Digitally styled” caption; recorded the full edit prompt, original source and output paths in `research/image-edits.md`.
- Replaced temporary archive paths with curated descriptive asset paths and responsive image source sets.
- Removed the unsupported registered-trademark symbol and replaced decorative text symbols with SVG.
- Added repeatable desktop/mobile screenshot capture.

#### Files Changed
- `src/App.jsx`, `src/data.js`, `index.html`, `scripts/screenshots.mjs`.
- `public/images/hero/eagle-studio-edited*.webp`, `research/image-edits.md`, `research/eagle-studio-edited-master.png`, `README.md`.

#### Why
Improve photographic presentation as requested while retaining original evidence of the business's work.

#### Testing
- Initial production build passed (Vite 6.4.3), with 83.46 KB gzip JavaScript and 8.11 KB gzip CSS before final image integration.
- Responsive variants encoded successfully; browser checks underway.

#### Known Issues
- Image edits can subtly alter details; original workshop photographs remain the reference.
- Google photo access limitation remains unchanged.

### Update 4 — Image framing and first browser fixes

#### Changes
- Created a square studio crop of the eagle with breathing room so the complete beak remains visible on phones and desktop.
- Created a cleaned peacock presentation and retained its original photo for comparison in the gallery viewer. The editing tool reconstructed previously obscured background/edge areas, so the original remains the reference.
- Archived unselected website WebPs outside the deployed public folder.
- Fixed lightbox arrow navigation from the initial close-button focus, darkened the brass text token for contrast, retained full text opacity in process steps, and made the horizontal studio ribbon keyboard accessible.
- Refined mobile heading sizing and made screenshot capture wait for lazy images.

#### Files Changed
- `src/App.jsx`, `src/data.js`, `src/styles.css`, `src/components/Modal.jsx`, `scripts/screenshots.mjs`.
- `public/images/hero/eagle-studio-square*.webp`, `public/images/portfolio/peacock-studio-edited*`, `research/image-edits*.md`, `research/website-webp-archive/`, `README.md`.

#### Why
Keep complete sculpture silhouettes in view, provide access to unedited photographs, and fix issues found by real browser checks.

#### Testing
- First integrated Chrome pass: 12 checks passed; 3 failures identified the lightbox keyboard defect and two accessibility issues described above. Fix verification is pending.
- Form flow, Unicode message encoding, image preview, editing, mobile navigation and no horizontal overflow at 360/390/768/1440 widths passed in that run.

#### Known Issues
- The old website lists conflicting Kukatpally and Nizampet addresses. Owner clarification requested; exact location is being reconciled before completion.

### Update 5 — Cinematic redesign: dramatic-contrast gallery, motion, prerendering

#### Changes
- Committed a "dramatic-contrast" art direction: a warm-ivory editorial canvas that descends into near-black gallery "acts" (portfolio, process, contact) where the artwork is spotlit, with restrained brass accents and editorial serif/sans typography throughout.
- Rebuilt the portfolio as a cinematic gallery wall: a featured lead piece plus a CSS-column masonry of **25 authentic works** (up from 8) across six filters — All work, Sculptures, Reliefs, Devotional, Murals, Events & sets — with hover reveal, category tags, serif titles, and an immersive keyboard-accessible lightbox (prev/next, original-photo toggle, per-piece WhatsApp CTA). Mobile uses a tight two-column gallery.
- Added new editorial sections: a "Not just thermocol" philosophy statement; a "Made to be seen" positioning band (Custom made / Detailed craft / Event ready / Visually distinctive — no invented claims); a Google trust band (profile link only, no fabricated rating) paired with a "Let's create something unforgettable" CTA; and a mid-page "Start a conversation" CTA band.
- Added a rich-but-performant motion layer (`src/lib/motion.js`): scroll reveals with stagger, subtle image parallax, a headline line-rise reveal, an animated marquee, and a scroll-driven process image stage — all gated behind `prefers-reduced-motion` and the on-page motion-pause control.
- Prepared **19 additional optimised responsive WebP artworks** from the archived existing-website photos via a gentle auto-tone/crop pipeline (`research/prepare-artwork.py`, Pillow). Each remains an authentic, unretouched-in-content business photo; the eagle hero remains the one clearly-labelled "digitally styled" studio presentation.
- Excluded images carrying third-party or stock watermarks after full-resolution review (`5`, `12`, `13` "Art Reflection", `28`, `34` stock, `55`). No reviews, ratings, awards, counts, or hours were invented.
- Added build-time prerendering (`scripts/prerender.mjs`): the homepage HTML is rendered to static markup and React hydrates it, so first paint no longer waits for JavaScript. Added a responsive hero-image preload.
- Accessibility hardening: fixed accessible-name/visible-text matches (brand, floating call button, hero seal), gave the decorative marquee a valid `role="img"` label, and raised inactive process-step opacity so dimmed text still meets WCAG AA contrast.
- Consistent conversion paths retained everywhere: `tel:+919059716009`, `https://wa.me/919059716009` with context-aware prefilled messages (hero, per-service, per-artwork, footer), the validated WhatsApp enquiry form, and the fixed mobile Call / WhatsApp / Enquire bar.

#### Files Changed
- `src/App.jsx`, `src/data.js`, `src/styles.css`, `src/main.jsx`, `src/lib/motion.js` (new).
- `index.html` (hero preload), `scripts/prerender.mjs` (new), `package.json` (build now prerenders).
- `research/prepare-artwork.py` (new), `public/images/portfolio/*`, `public/images/process/*` (19 new optimised artworks + variants).
- `tests/site.spec.js` (updated for new gallery counts, categories, titles, and nav labels).

#### Why
To meet the brief's bar — an art gallery that happens to be a high-converting business website — the artwork had to dominate, the portfolio had to stop being a plain grid, and motion/performance/mobile had to feel world-class, without inventing any business facts.

#### Testing
- Unit tests: 7 passed (`npm test`).
- Playwright e2e: 19 passed, including gallery filters (All 24 cards + 1 feature; Sculptures 6; Reliefs 7; Events 4), lightbox keyboard navigation and focus restore, the full enquiry → WhatsApp flow (Unicode-safe, edit-preserves-values, reference-image validation), per-service form selection, mobile navigation, no horizontal overflow at 360/390/768/1440, reduced-motion, and axe WCAG 2.1/2.2 AA audits at 390 and 1440 with zero violations.
- Hydration verified against the prerendered production build with zero console errors; all four service tabs render without error.
- Lighthouse (production build, latest Chrome): **Desktop — Performance 99, Accessibility 100, Best Practices 100, SEO 100** (LCP 0.8s, CLS 0.004); **Mobile — Performance 91, Accessibility 100** (CLS 0, TBT 90ms).
- Call link, WhatsApp links (default + per-service + per-artwork), and the enquiry handoff were exercised by the test suite.

#### Known Issues
- Exact workshop address remains unpublished pending owner confirmation (the old site shows conflicting Kukatpally/Nizampet addresses); the site asks visitors to call before visiting rather than publishing an unverified address.
- Google Business Profile photos/rating remain unretrievable (Google CAPTCHA wall); the Google link is used as a plain trust link with no fabricated rating. A web listing shows 4.5★/16 ratings for a differently-named entity ("Prasad 3d Designs Works") whose relationship to this business is unverified, so it is deliberately not published.
- WhatsApp still requires the visitor to press Send and attach any reference image themselves; the site never claims an enquiry was received before that. No server backend is configured, in line with the WhatsApp-only delivery choice.
