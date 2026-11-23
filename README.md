# mostafashaaban.co

A hand-built static site for **Mostafa Shaaban — Furniture Atelier** (mostafashaaban.co), Tanta, Egypt.

## Run locally

```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

Then open <http://localhost:8000>.

## Structure

```
index.html            Home — opening sequence, hero, collections, styles, pieces
products.html         The collection — style filters, live search, sorting, quick view
gallery.html          Selected rooms — filters + lightbox
story.html            Our story — timeline, values, atelier
contact.html          Showroom, enquiry form, FAQ
assets/css/main.css   Design system, animations, responsive layout
assets/js/data.js     Content model (products, styles, gallery, pages)
assets/js/main.js     Intro, nav, global search, reveal/parallax, modal, transitions
assets/js/catalog.js  Filtering, sorting, deep links for the collection page
assets/img/           Art direction — hero, style collections, products, editorial
```

No build step, no dependencies. Fonts are loaded from Google Fonts with local
serif/sans fallbacks.

### Notes

* The opening animation plays once per browser session (skippable by click,
  scroll or any key), and is disabled entirely for `prefers-reduced-motion`.
* Global search: `⌘K` / `Ctrl K`, or `/`.
* All imagery is sample art direction for this build; swap files in
  `assets/img/` with the same names to use real photography.
