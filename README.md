# Maison Elm — website

A one-page website in plain files. Open `index.html` in any browser to see it.

```
index.html          the page (all the words live here)
css/style.css       colours, fonts and layout (colours are at the very top)
js/main.js          the motion: opening sequence, the sliding tour, counters, form
images/             photos (swap in your own using the same file names)
images/textures/    the drawn material swatches (limewash, pine, linen, velvet, brass, ticking)
```

## Placeholders to replace

Everything in `[square brackets]` on the page has a dotted sage highlight so it's easy to spot.

| Where | Placeholder |
| --- | --- |
| Selected houses | `[House name]`, `[Neighborhood]` and the project type on all five houses |
| Sample board | `[Optional: name the suppliers or workshops…]` |
| Press quote | `[A line or two from a real press feature or client…]`, `[Publication or client name]`, `[Year]` |
| Enquiry section | `[Studio address, if you would like it shown]` |
| Footer | `[hello@yourstudio.com]`, `[Instagram link]` |

Details taken from the example brief that need confirming: the name **Maison Elm**, **Charleston, South Carolina**, the phone number **(555) 012-6194**, the **1794 townhouse** and its four rooms, the fees (**$38,000 / $8,500 / $350**), and the five materials. The room captions and the four process steps were written to suit the design. Check that they match how you really work.

## Photos (free Unsplash stand-ins, swap for your own)

| File | Used for | Source |
| --- | --- | --- |
| hero-room.jpg | Big hero photo | `photo-1615529182904-14819c35db37` |
| hero-detail.jpg | Small hero detail (vase) | `photo-1612196808214-b8e1d6145a8c` |
| philosophy-pill.jpg | Pill photo inside the sentence | `photo-1616627561950-9f746e330187` |
| tour-parlor.jpg / tour-parlor-detail.jpg | Tour 01 + close-up | `photo-1615874694520-474822394e73` / `photo-1603006905003-be475563bc59` |
| tour-kitchen.jpg / tour-kitchen-detail.jpg | Tour 02 + close-up | `photo-1600489000022-c2086d79f9d4` / `photo-1565538810643-b5bdb714032a` |
| tour-breakfast.jpg / tour-breakfast-detail.jpg | Tour 03 + close-up | `photo-1519643381401-22c77e60520e` / `photo-1610701596007-11502861dcfa` |
| tour-garret.jpg / tour-garret-detail.jpg | Tour 04 + close-up | `photo-1617325247661-675ab4b64ae2` / `photo-1532372320572-cda25653a26d` |
| house-1 … house-5.jpg | Selected houses | `photo-1570129477492-45c003edd2be`, `photo-1480074568708-e7b720bb3f09`, `photo-1560184897-ae75f418493e`, `photo-1449844908441-8829872d2607`, `photo-1616046229478-9901c5536a45` |

All are free photos under the Unsplash License (not Unsplash+). Each one is at `https://images.unsplash.com/<id>`.
A gentle warm "late-afternoon" tint is added to every photo by the stylesheet, so your own photos will pick up the same light.

## The enquiry form

The form works without extra setup on **Netlify** (it uses Netlify Forms; turn on *Form detection* in the site's Forms settings).
Anywhere else, or opened straight from your computer, it politely asks visitors to call instead.
