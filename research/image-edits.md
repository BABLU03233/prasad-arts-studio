# Photograph editing log — 2026-10-02

User explicitly requested enhanced/cropped/edited photographs using installed or built-in tools.

## Eagle hero

- Source: `research/assets-original/images-58.jpeg`, obtained from https://www.prasadartsthermocol3dworks.com/images/58.jpeg
- Tool: built-in Imagegen (image edit), followed by WebP encoding and responsive sizing.
- Edited master: `research/eagle-studio-edited-master.png`.
- Website assets: `public/images/hero/eagle-studio-edited.webp` and 480w/960w/1440w WebP variants.
- Original remains visible in the portfolio: `public/images/services/thermocol-eagle.webp`.
- The hero is a digitally styled presentation of the existing sculpture. The backdrop and lighting are edited; this image does not document an actual gallery installation.
- Visual review: retained the identifiable eagle profile, hand-cut feather forms and white thermocol texture. AI image editing can subtly alter details; the unedited workshop photograph remains the reference of record.

### Prompt used

Use case: precise-object-edit. Asset type: editorial website hero photo. Edit target: the supplied real white thermocol eagle-head sculpture in a messy workshop. Create a clean premium art-gallery product photograph OF THIS EXACT SCULPTURE. Preserve the exact head profile, eye, beak shape, all carved feather shapes, scale/proportions, handmade irregularities, and white granular thermocol texture. Do not redesign, add feathers, paint, smooth into marble, or invent any other artwork. Remove only the workshop background, metal scaffolding, and floor debris; replace the surroundings with a seamless warm grey-beige studio floor and wall, softly lit from upper left with a believable contact shadow. The actual eagle sculpture remains the only subject, large and visually dominant. Landscape-to-square editorial composition, sculpture centered slightly right, entire beak and back of head visible, around 10% clean breathing room, no pedestal required. Natural photographic tonal refinement, detailed tactile surface, subdued warm neutral palette. No text, no logos, no watermark, no decorative props. Keep the sculpture's original camera angle exactly. This is a retouched existing business photograph, not an imagined finished project.

## Square framing refinement (selected hero)

- Tool: built-in Imagegen edit using the edited master above as input.
- Master: `research/eagle-studio-square-master.png`, 1254 × 1254.
- Final consumed assets: `public/images/hero/eagle-studio-square-{480,960}w.webp`; full-size WebP is retained alongside.
- Purpose: retain the complete beak and head in responsive crops. The earlier landscape edit is retained in the research archive.

### Refinement prompt

Edit this existing image ONLY to expand the studio background and reframe it as a SQUARE 1:1 photograph (1024x1024 composition). Preserve the exact thermocol eagle sculpture from this image, pixel-faithful as possible: unchanged silhouette, beak, eye, individual carved feathers, white bead texture, angle and lighting. Make the ENTIRE eagle head occupy approximately 78% of the square canvas width and 52% of the square canvas height. Center it horizontally, its bottom at 78% of canvas height, with a generous uninterrupted warm grey-taupe studio backdrop above and on both sides and a studio floor below with the natural soft contact shadow. This is an OUTPAINT AND ZOOM-OUT, not a redesign. Full beak and back of sculpture must be comfortably within frame with 10% to 12% empty margins. Empty backdrop must be seamless and softly lit; preserve warm neutral tones. No pedestal, no additions, no typography, no artificial polish, no watermark. Output a square composition, not landscape.
