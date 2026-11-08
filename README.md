# All Wrapped Up · website

A one-page website in plain files. Open `index.html` in any browser to see it.

```
index.html          the page (all the words live here)
css/style.css       colours, fonts and layout (brand colours are at the very top)
js/main.js          the motion: opening sequence, the sliding lookbook, counters, form
images/             photos and the logo (swap in your own using the same file names)
images/textures/    the drawn fabric swatches (linen weave, drape, leaf print, knit, satin, stripe)
```

Colours and fonts follow the All Wrapped Up brand guide: cream `#F7F1E8`, sand `#D9C9B6`,
ink `#2B2B2B`, brand orange `#F05A28` (buttons and small accents only), Marcellus for
headings and Jost for body text.

## Placeholders to replace

Everything in `[square brackets]` on the page has a dotted highlight so it's easy to spot.

| Where | Placeholder |
| --- | --- |
| The range | Prices: `R [0 000]` for trousers, tops and blouses, and ponchos |
| Lookbook swatch cards | `[Fabric]`, `[Finish]` and `[Colour]` on all twelve cards |
| How to order, step 3 | `[how payment and delivery or collection work]` |
| Ways to wear it | `[Look name]` and `[Piece] · [Colour]` on all five photos |
| Fabric board | `[Name each fabric on the board, and how to care for it]` |
| Quote band | `[A line or two from a real customer or press feature…]`, `[Customer or publication name]`, `[Year]` |
| Order section | `[Town or city, if you would like it shown]` |
| Footer | `[Email address, if you would like it shown]`, `[Instagram link]` |
| Form message (in `js/main.js`) | `[WhatsApp or Instagram]`, shown if the form is not connected |

The four counting figures (3 families, 1 tie, 4 lookbook pieces, 2 dress codes) come from
your brand guide. The swatches on the hero and fabric board are labelled No. 01 to No. 06
until you name the fabrics.

## Logo

`images/logo.svg` is a stand-in drawn from the brand guide's description (orange disc,
white needle and thread). Replace it with your real logo file, keeping the same name.

## Photos (free Unsplash stand-ins, swap for your own)

| File | Used for | Unsplash image |
| --- | --- | --- |
| hero-look.jpg | Big hero photo | `photo-1596783074918-c84cb06531ca` |
| hero-detail.jpg | Small hero detail (tie close-up, cropped) | `photo-1496747611176-843222e1e57c` |
| philosophy-pill.jpg | Pill photo inside the sentence | `photo-1558769132-cb1aea458c5e` |
| look-trousers.jpg (+ -detail) | Lookbook 01 and its close-up | `photo-1566206091558-7f218b696731` |
| look-blouse.jpg (+ -detail) | Lookbook 02 and its close-up | `photo-1564257631407-4deb1f99d992` |
| look-poncho.jpg (+ -detail) | Lookbook 03 and its close-up | `photo-1434389677669-e08b4cac3105` |
| look-semiformal.jpg (+ -detail) | Lookbook 04 and its close-up | `photo-1618244972963-dbee1a7edc95` |
| edit-1 … edit-5.jpg | Ways to wear it | `photo-1619086303291-0ef7699e4b31`, `photo-1611432579699-484f7990b127`, `photo-1611042553365-9b101441c135`, `photo-1608748010899-18f300247112`, `photo-1445205170230-053b83016050` |

All are free photos under the Unsplash License (not Unsplash+), at `https://images.unsplash.com/<id>`.
None of them are All Wrapped Up garments, so swap them for your own photos before going live.
A gentle warm "late-afternoon" tint is added to every photo by the stylesheet, so your own
photos will pick up the same light.

## The order form

The form works without extra setup on **Netlify** (it uses Netlify Forms; turn on *Form
detection* in the site's Forms settings). Anywhere else, or opened straight from your
computer, it politely asks visitors to message you another way instead.
