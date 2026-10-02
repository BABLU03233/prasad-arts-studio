# Existing website research and asset archive

Reviewed on 2 October 2026. Source: https://www.prasadartsthermocol3dworks.com/ and its public navigation pages. The source HTML is archived in `research/website-pages/`; exact image provenance, source pages, dimensions, hashes, and sizes are recorded in `research/website-assets.json`.

## Verified business information

- Public name: **Prasad Arts Thermocol 3d design works**.
- Phone: **+91 9059716009** (matches the number provided by the owner).
- Email: **prasadbabu19800@gmail.com**.
- Address shown on the website: **Plot No.283, SY.No.1007, Kukatpally, Hyderabad - 500072, Telangana**.
- Service area described by the website: Hyderabad; its page metadata lists Jubilee Hills, Banjara Hills, Kukatpally, Pragathi Nagar, Balanagar, Moosapet, Miyapur, Dilsukhnagar, and Chanda Nagar.

## Services listed by the existing website

1. Birthday events.
2. False ceiling works.
3. Wall art design.
4. Fiber work.
5. Fabrication work.
6. Thermocol 2D and 3D work.
7. Wall murals.
8. Portrait canvas artwork.
9. Wall texture.
10. Event decoration and movie setting works.

These appear in the navigation, home page description, and dedicated service pages. The website's general description supports custom work for events and interiors. Avoid inventing material specifications, prices, delivery guarantees, service commitments, years of experience, client names, or project counts from these general descriptions.

## Asset acquisition

- Crawled all **15 linked public pages**, including gallery, contact, about, and the ten service pages.
- Found **81 distinct referenced image URLs**; **80 downloaded successfully**, representing **79 exact unique files** (the two logos are duplicates).
- One obsolete decorative URL returned HTTP 404: `images/resource/brochure-bg.jpg`.
- Original downloaded image bytes are preserved under `research/assets-original/`.
- The complete WebP archive is available under `research/website-webp-archive/`, using `website-` plus the original path with hyphens. Images retain their aspect ratios and are capped at 1920 pixels on the longest side; original source resolution is never increased. Only visually reviewed selections are copied into the organized `public/images/` directories.
- Total source bytes: **13,972,418**. Total WebP bytes: **7,628,042** (about 45% smaller).
- Visual contact sheets are `research/website-contact-sheet-1.jpg` through `research/website-contact-sheet-3.jpg`.
- `research/acquire-website-assets.py` reproduces this archive. It reads the public source site and writes only within this project.
- These files are sourced from the existing business website. Publication there establishes provenance but does not independently verify who photographed or created every pictured work. Avoid inventing project/client attribution.
- This archive does **not** represent a Google Business Profile image export; Google-profile research is tracked separately.

## Asset review and selected imagery

**Important review correction:** inspecting images at original resolution revealed that the old site's gallery includes third-party material. Image `28.jpeg` contains another sculptor's visible watermark; `5.jpeg` names Art Reflection Studio and another contact number; `12.jpeg` contains an unidentified sculptor's monogram. These should not appear as this business's commissioned work. The elegant original thumbnail alone was insufficient to determine this. The recommendations below replace the initial contact-sheet selection.

The selected files were each inspected at original resolution and showed no visible third-party artist watermark. Their presence on the source website still does not independently establish authorship. Keep descriptions literal and avoid invented project names, locations, clients, or attribution. Image `56.jpeg` (white geometric deer in a polished retail setting) is omitted because it could be a generic reference photograph.

`research/selected-assets.json` records descriptions, visual review notes, original URLs, and responsive image dimensions. `research/prepare-selected-assets.py` creates descriptive organized copies with width-based WebP variants. Each photograph retains its original content without retouching or watermark removal. Original width is the upper limit; lower-resolution files are not enlarged.

| Public asset | Dimensions of original | Visible content | Suggested use |
| --- | --- | --- | --- |
| `/images/hero/floral-wall-relief.webp` | 960 × 1280 | White sculpted flowers with integrated lights on interior wall | Elegant hero; on-site process |
| `/images/portfolio/peacock-sculpture.webp` | 1024 × 768 | Bright green and blue peacock sculpture/display | Statement hero or sculpture card |
| `/images/portfolio/fairytale-event-stage.webp` | 1600 × 1195 | Colorful forest/fairyland event stage | Event project feature |
| `/images/portfolio/floral-event-installation.webp` | 1600 × 1195 | Outdoor fairytale/tree installation | Large event project |
| `/images/portfolio/zebra-sculpture.webp` | 1600 × 1195 | Zebra sculpture in workshop | Sculpture/process section |
| `/images/portfolio/devotional-sculpture.webp` | 1200 × 1600 | Painted devotional figures and unfinished bull | Decorative sculptures |
| `/images/portfolio/ornamental-set-piece.webp` | 720 × 540 | Gold-toned pedestal in workshop | Set and event props |
| `/images/services/thermocol-eagle.webp` | 960 × 576 | Large white eagle-head sculpture in workshop | Thermocol sculpture / making-of |
| `/images/process/model-making.webp` | 1280 × 960 | People working on a landscape model | Craft/process section; don't identify individuals |
| `/images/services/landscape-model.webp` | 1280 × 960 | Landscape scale model | Model-making portfolio |
| `/images/services/canvas-portrait.webp` | 1280 × 720 | Portrait painting with reference photograph on easel | Portrait/canvas service |

The landscape backgrounds, street-art collage slider, and staged interior collages in the old website may be template/reference imagery; do not use them as evidence of completed commissioned projects. Prefer clearly photographed sculptures, relief work, workshop scenes, and event installations.

## Source-site quality observations

- Many links are placeholders (`href="#"`), including social links and primary banner actions.
- No reliably attributable Google reviews, ratings, client quotes, or opening hours were found in the reviewed business-site content.
- Counters and generic marketing claims in the template should not be treated as verified proof points.
- The owner-provided number should be the destination for both `tel:+919059716009` and WhatsApp links to `https://wa.me/919059716009`.
- For enquiries, clearly explain any handoff to WhatsApp so users understand when their message is actually sent.
