# E-Portfolio (HCI Assignment 1)

Static site: HTML, CSS, vanilla JavaScript. No build step.

## Files

| Path | What it is |
|---|---|
| `index.html` | Home |
| `about.html` | About me and contact details |
| `academic.html` | Education timeline, certificate lightbox, certifications |
| `works.html` | Project cards, category filter, project detail popups |
| `qualities.html` | Expandable quality cards (STAR examples) and skills |
| `contact.html` | Mock contact form with validation (sends nothing) |
| `css/style.css` | One shared stylesheet. Colours and fonts are variables at the top |
| `js/main.js` | Shared interactions (menu, dialogs, filter, form) |
| `images/` | Placeholder SVGs: replace with your photo, screenshots and redacted certificate scans |
| `cv/cv.pdf` | Placeholder CV: replace with your real CV |

## Run it

Opening `index.html` directly works. For Figma capture (html.to.design), serve it on localhost:

```
python -m http.server 5500
```

Then open http://localhost:5500

## Placeholders

Every invented or unconfirmed detail has `class="ph"` and shows **red with a dashed underline**.
Find them all: search the HTML files for `class="ph`.
Before the final screenshots, delete the `.ph { ... }` rule near the top of `css/style.css`.

## Swap the palette

Edit the five `--c-*` values at the top of `css/style.css`, then re-check text contrast (WCAG AA 4.5:1).
Current palette: Coolors "Refreshing Summer Fun", https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500
