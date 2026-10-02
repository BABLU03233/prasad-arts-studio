# Self-hosted typography

Downloaded on **2 October 2026 (Asia/Kolkata)** from official Google Fonts endpoints. These are real WOFF2 fonts, checked for the WOFF2 file signature after download. Only the Latin subset is included.

| File in `public/fonts/` | Typeface | Style and intended weights | Size |
| --- | --- | --- | --- |
| `cormorant-garamond-latin.woff2` | Cormorant Garamond | Normal, variable 400–600 | 37,640 bytes |
| `cormorant-garamond-latin-italic.woff2` | Cormorant Garamond | Italic, 500 | 23,924 bytes |
| `manrope-latin.woff2` | Manrope | Normal, variable 400–700 | 24,836 bytes |

## Official sources

- [Google Fonts CSS request](https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400..600;1,500&family=Manrope:wght@400..700&display=swap)
- [Cormorant Garamond normal WOFF2](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2)
- [Cormorant Garamond italic WOFF2](https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5wDD-iNM8.woff2)
- [Manrope WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2)

The original stylesheet is retained as `research/google-fonts-source.css`; exact provenance and byte sizes are in `research/google-fonts-manifest.json`. To repeat the download, run `python research/google-fetch-fonts.py` with network access.

## Licenses

Both typefaces are distributed under the SIL Open Font License 1.1. Original license files were downloaded from the official `google/fonts` repository and retained beside the font files:

- `public/fonts/cormorantgaramond-OFL.txt` — [official license](https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/OFL.txt)
- `public/fonts/manrope-OFL.txt` — [official license](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt)

## CSS declarations

```css
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('/fonts/cormorant-garamond-latin.woff2') format('woff2');
  font-style: normal;
  font-weight: 400 600;
  font-display: swap;
}

@font-face {
  font-family: 'Cormorant Garamond';
  src: url('/fonts/cormorant-garamond-latin-italic.woff2') format('woff2');
  font-style: italic;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: 'Manrope';
  src: url('/fonts/manrope-latin.woff2') format('woff2');
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
}
```
