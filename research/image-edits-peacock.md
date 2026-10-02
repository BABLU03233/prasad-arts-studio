# Peacock photograph edit

Date: 2 October 2026.

## Source and authorization

The owner requested image enhancement/cropping/editing using installed or built-in tools. This edit uses the built-in `image_gen` tool under the `imagegen` skill; no API or CLI fallback was used.

- Source website photo: https://www.prasadartsthermocol3dworks.com/images/a6.jpg
- Archived source: `research/assets-original/images-a6.jpg` (1024 × 768).
- Edit input: `public/images/portfolio/peacock-sculpture.webp` (1024 × 768).
- Output from built-in tool: `C:/Users/gbhar/.codex/generated_images/01a0f901-be93-7101-82db-fe46897b74ad/exec-b54eb39b-27e5-467c-8277-6bd5c2283735.png`.
- Copied project output: `public/images/portfolio/peacock-studio-edited.png` (1448 × 1086).

## Intended changes and fidelity review

Removed the shop/signage background and foreground motorcycle, placing the sculpture against a warm cream studio wall and natural floor. The prompt explicitly locked the sculpture's composition, feather arrangement, coloring, proportions and handmade details. The result was visually inspected: the main fan arrangement, green/gold finish and blue body remain recognizable and closely aligned with the original; no text, unrelated object, logo or watermark was introduced.

This is an **AI-assisted photo edit**, not an unaltered documentary photograph. The tool reconstructed areas hidden by the motorcycle and may introduce small shape/texture differences. It should be labeled as an edited presentation when relevant; do not claim pixel-perfect preservation or use the synthetic backdrop as proof of the actual workshop location. Keep the unedited source accessible in the project archive.

## Exact prompt

```text
Use case: precise-object-edit. Asset type: edited portfolio photograph for an artisan sculpture website. Input image 1 is the edit target, a photograph of an existing handmade green, gold and blue peacock sculpture. Replace ONLY the surrounding shop background, signs, clutter, and the black motorcycle mirror/handlebar in the foreground with a warm neutral cream studio wall and natural matte stone floor, with soft realistic contact shadows. Preserve the EXACT existing peacock sculpture: identical silhouette and proportions, identical arrangement, count, positioning and ornate ribbed patterns of its fan feathers, identical green-gold paintwork, blue body, pale beak, face, eyes, feet and all handmade texture. Do not redesign, stylize, smooth, add or remove sculpture details. Where motorcycle parts overlap the artwork, conservatively restore only the directly occluded continuation of existing forms, with no new decoration. Keep the sculpture photographed from exactly the same frontal angle. A refined natural product photograph, gentle diffuse lighting, realistic material texture. Show the existing sculpture centered with a little neutral breathing room, landscape 4:3 composition. Do not invent a more elaborate peacock, extra feather rows, new pedestal, props, text, logos or watermarks. This is faithful background cleanup of a real photographed artwork, not generation of a new artwork.
```

## Delivered responsive assets

- `public/images/portfolio/peacock-studio-edited.webp`: full-size WebP, 1448 × 1086.
- `public/images/portfolio/peacock-studio-edited-480w.webp`: 480 × 360.
- `public/images/portfolio/peacock-studio-edited-960w.webp`: 960 × 720.
- `public/images/portfolio/peacock-studio-edited-1448w.webp`: 1448 × 1086.

WebP variants use Lanczos resizing and quality 88; no further creative image editing was performed during conversion.

## Archive cleanup

Moved 80 unselected flat `website-*.webp` files from `public/images/` into `research/website-webp-archive/`. Resolved source and destination paths were checked to remain inside their intended workspace directories before each move. Originals are retained. Public assets now use the selected organized directories, preventing incidental deployment of the legacy site's template and third-party-watermarked images.
