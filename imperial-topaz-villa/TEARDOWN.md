# Imperial Topaz Villa: site teardown

Source: https://thedeluxecollection.co.za/imperial-topaz-villa/ (fetched 2026-11-19)

## Stack
| Layer | What it uses |
|---|---|
| CMS | WordPress 7.1.5 (installed under `/wp/`) |
| Theme | Astra 4.13.6, with the transparent-header and header/footer builder |
| Page builder | Elementor 4.1.4, page ID 3609, kit 38 |
| Header/footer | Ultimate Addons "Header Footer Elementor" |
| SEO | SureRank 1.9.2 (outputs JSON-LD) |
| Analytics | Google Site Kit 1.191.0 and GTM4WP. GA4 `G-QS6TLNJHL1`, Google Ads `AW-18538176305` |
| Chat | Click to Chat for WhatsApp, +27 84 368 9117 |
| Other plugins (not used on this page) | LatePoint (bookings), SureForms, FormLayer, SocialFeeds, Astra Sites (starter templates) |

## Page structure (Elementor widgets: heading, divider, icon-list, text-editor, button, image-gallery)
1. **Header**: transparent and overlaid on the hero. Logo (44×44) on the left. Menu: Home, About, Services, Villas, South Africa, Contact.
2. **Hero**: one slideshow background image (`2026/08/PHOTO-2025-04-07-07-39-18-5.jpg`) with a linear gradient at 60% opacity, `#153243` to `rgba(0,0,0,.92)`. Padding is 200/100px. The H1 is white with 2.5px letter-spacing (40px tablet, 30px mobile). A gold divider sits under it at 25% width.
3. **Intro** (background `#0D0D0D`, padding 100px):
   - Left column: gold dividers (263px) above and below a gold icon list with Font Awesome `fa-bed`, `fa-bath` and `fa-user-friends`. The items read "4 BEDS", "4 BATHROOMS" and "8 PEOPLE".
   - Right column: the description in `#BDBDBD` and a white "View PDF" button with `#0E0E0E` text.
4. **Gallery** (white, padding 100px): 3 columns with 10px gutters and the Elementor lightbox. It has 21 images named `2026/10/Imperial-Topaz-{n}.jpg` in this order: 18, 14, 13, 17, 4, 20, 22, 2, 12, 11, 21, 15, 3, 5, 10, 6, 19, 7, 9, 8, 16.
5. **Footer**: menu (no South Africa link), the primary logo, "Copyright © 2026.thedeluxecollection", and a Privacy Policy link.
6. **Floating "WhatsApp us" button**. Pre-filled message: "Hello I would like to enquire about the deluxe collection."

## Design tokens
- Gold accent `#E4AD50`, navy `#153243`, near-black `#0D0D0D` / `#0E0E0E`, body text `#3A3A3A`, muted `#BDBDBD`.
- Fonts: Astra loads **Playfair** (headings) and **Work Sans** (body). Elementor also loads Roboto and Roboto Slab with every weight from 100 to 900, which the page barely uses.
- The Elementor kit globals (`#6EC1E4`, `#61CE70`, `#54595F`, `#7A7A7A`) are the untouched defaults.

## Issues found on the live page
1. **"View PDF" goes nowhere.** The button has no `href`.
2. **Hero image doesn't match.** It comes from a different August upload (`PHOTO-2025-…`), not the Topaz set.
3. **H1 reads "Topaz villa,"** with a trailing comma, and the name doesn't match the page title "Imperial Topaz Villa".
4. **The meta description is auto-generated** and ends in "View PDF". There are also two `description`/`og:*` sets: SureRank and another SEO output both print them.
5. **Schema is placeholder data.** The Organization `name` is empty, `sameAs` is just `https://x.com/`, and the WebSite description is "My WordPress Blog".
6. **All 21 gallery images have empty `alt`**, which hurts accessibility and image SEO.
7. **No enquiry path except WhatsApp.** The page has no rates, availability, form or LatePoint booking widget, even though those plugins are installed.
8. **Page weight**: 20+ Elementor assets plus 18 Roboto/Roboto Slab font weights.

## Rebuild
`index.html` in this folder is a dependency-free static version with the same layout, tokens and copy. It also fixes several of the issues above:
- correct H1
- descriptive alt text
- clean meta tags
- keyboard-accessible lightbox
- mobile menu
- two font families instead of four
- no tracking scripts

Images are hotlinked from the live site, so it depends on those URLs staying up. The PDF button has a TODO until the brochure exists.
