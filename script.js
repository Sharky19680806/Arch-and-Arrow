/* All Wrapped Up — behaviour and illustrations
   ------------------------------------------------------------
   THINGS TO EDIT (placeholders):                              */
const SETTINGS = {
  // Your WhatsApp number in international format, digits only, e.g. "27821234567".
  // While this is empty, the buttons still open WhatsApp but ask the visitor to pick a contact.
  whatsappNumber: "",
  // PLACEHOLDER prices, shown in the fitting room. Replace with real prices, e.g. "R 1 250".
  prices: { dress: "R 0 000", pants: "R 0 000" },
  finishes: [
    { name: "Oak, with a grey tie", short: "Oak with a grey tie",
      copy: "A warm, sun-baked tan with a cool grey tie. Quiet in the morning, easy at night.",
      leadWeeks: 2 /* PLACEHOLDER lead time */ },
    { name: "Birch, with a sand tie", short: "Birch with a sand tie",
      copy: "Pale and light, tone on tone. The one that goes with everything you already own.",
      leadWeeks: 3 /* PLACEHOLDER lead time */ },
    { name: "Walnut, with a forest tie", short: "Walnut with a forest green tie",
      copy: "Deep brown, closed with dark green. A little more evening, a little more occasion.",
      leadWeeks: 4 /* PLACEHOLDER lead time */ }
  ]
};
/* ------------------------------------------------------------ */

document.documentElement.classList.add("js");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ============ ILLUSTRATIONS (drawn in code, no photos needed) ============ */
let uidN = 0;
const OAK = "#C79A65", OAK_D = "#A77C4B", OAK_L = "#D9B283", GRAIN = "#8E6538", LINEN = "#E9DFCF", INK = "#2A2A28";

const defs = u => `
<defs>
  <pattern id="wv${u}" width="3.6" height="3.6" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
    <path d="M0 1.2H5" stroke="#000" stroke-opacity=".1" stroke-width=".8"/>
    <path d="M1.2 0V5" stroke="#fff" stroke-opacity=".15" stroke-width=".8"/>
    
  </pattern>
  <linearGradient id="lt${u}" x1="0" x2="1" y1="0" y2=".25">
    <stop offset="0" stop-color="#fff" stop-opacity=".3"/>
    <stop offset=".38" stop-color="#fff" stop-opacity="0"/>
    <stop offset=".7" stop-color="#000" stop-opacity=".08"/>
    <stop offset="1" stop-color="#000" stop-opacity=".3"/>
  </linearGradient>
  <linearGradient id="dn${u}" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/>
  </linearGradient>
  <filter id="bl${u}" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="7"/></filter>
  <filter id="sf${u}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
</defs>`;

// a round cut end of timber, with growth rings
const cutEnd = (cx, cy, rx, ry) => `
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${OAK_L}" stroke="${GRAIN}" stroke-width=".5"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx * .68}" ry="${ry * .68}" fill="none" stroke="${GRAIN}" stroke-width=".45" opacity=".8"/>
  <ellipse cx="${cx + .2}" cy="${cy}" rx="${rx * .36}" ry="${ry * .36}" fill="none" stroke="${GRAIN}" stroke-width=".45" opacity=".8"/>
  <ellipse cx="${cx + .3}" cy="${cy}" rx="${rx * .1}" ry="${ry * .1}" fill="${GRAIN}"/>`;

// the oak stand every garment sits on: pole + three legs, grain lines, cut ends, soft floor shadow
function stand(u, cx, y0, y1) {
  const leg = (x2, y2, w, shade) => {
    const dx = x2 - cx, dy = y2 - (y1 - 4), len = Math.hypot(dx, dy), nx = -dy / len * w, ny = dx / len * w;
    const a = [cx + nx, y1 - 4 + ny], b = [x2 + nx, y2 + ny], c = [x2 - nx, y2 - ny], d = [cx - nx, y1 - 4 - ny];
    return `<path d="M${a} L${b} L${c} L${d}Z" fill="${shade}"/>
      <path d="M${cx + nx * .3},${y1 - 4 + ny * .3} L${x2 + nx * .3},${y2 + ny * .3}" stroke="${GRAIN}" stroke-width=".6" opacity=".7"/>
      <path d="M${cx - nx * .45},${y1 - 4 - ny * .45} L${x2 - nx * .45},${y2 - ny * .45}" stroke="${GRAIN}" stroke-width=".4" opacity=".5"/>`;
  };
  return `
  <ellipse cx="${cx + 10}" cy="${y1 + 20}" rx="128" ry="12" fill="${INK}" opacity=".3" filter="url(#bl${u})"/>
  ${leg(cx + 66, y1 + 6, 4, OAK_D)}${cutEnd(cx + 66, y1 + 6, 2.6, 4.2)}
  <rect x="${cx - 5.5}" y="${y0}" width="11" height="${y1 - y0}" fill="${OAK}"/>
  <rect x="${cx + 1.5}" y="${y0}" width="4" height="${y1 - y0}" fill="${OAK_D}" opacity=".7"/>
  <path d="M${cx - 2.5},${y0} V${y1} M${cx - .2},${y0} V${y1}" stroke="${GRAIN}" stroke-width=".5" opacity=".6"/>
  ${leg(cx - 72, y1 + 14, 4.4, OAK)}${cutEnd(cx - 72, y1 + 14, 2.9, 4.7)}
  ${leg(cx + 16, y1 + 28, 4.6, OAK_L)}${cutEnd(cx + 16, y1 + 28, 4.8, 3.4)}
  <ellipse cx="${cx}" cy="${y1 - 4}" rx="9" ry="4.5" fill="${OAK_D}"/>`;
}

// the bow of the wrap tie
function bow(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" stroke="${INK}" stroke-opacity=".28" stroke-width=".8" stroke-linejoin="round">
    <path class="ct" d="M-2,3 C-7,32 -13,62 -24,92 L-11,96 C-3,66 3,34 4,4Z"/>
    <path class="ct" d="M2,3 C10,32 18,54 29,78 L17,84 C8,62 2,36 -1,5Z"/>
    <path d="M-2,3 C-7,32 -13,62 -24,92 L-18,94 C-9,62 -3,32 0,4Z" fill="#000" fill-opacity=".1" stroke="none"/>
    <path class="ct" d="M0,0 C-16,-19 -38,-14 -36,-1 C-34,12 -14,11 0,0Z"/>
    <path class="ct" d="M0,0 C14,-17 35,-13 34,0 C33,12 14,10 0,0Z"/>
    <path d="M-6,-1 C-16,-9 -27,-8 -30,-2 M6,-1 C15,-8 25,-7 28,-1" fill="none"/>
    <rect class="ct" x="-6.500" y="-6.500" width="13" height="13" rx="3.500"/>
  </g>`;
}

// shared garment renderer
function garment(o, attrs = "") {
  const u = ++uidN;
  const folds = (o.folds || []).map(d => `<path d="${d}" fill="none" stroke="#000" stroke-opacity=".13" stroke-width="1.3" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="#000" stroke-opacity=".05" stroke-width="13" stroke-linecap="round" transform="translate(7 0)"/>
    <path d="${d}" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="5" stroke-linecap="round" transform="translate(-5 0)"/>`).join("");
  const piping = (o.piping || []).map(d => `<path d="${d}" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="3.6" stroke-linecap="round"/>
    <path class="cts" d="${d}" stroke-width="2.3" stroke-linecap="round"/>`).join("");
  return `<svg viewBox="0 0 420 640" preserveAspectRatio="xMidYMax meet" ${attrs}>${defs(u)}
    ${stand(u, 208, o.poleTop, 592)}
    <g transform="translate(0 ${o.shift || 0})">
    ${o.behind || ""}
    <path class="cg" d="${o.body}"/>
    <clipPath id="c${u}"><path d="${o.body}"/></clipPath>
    <g clip-path="url(#c${u})">
      <rect width="420" height="640" fill="url(#wv${u})"/>
      <rect width="420" height="640" fill="url(#lt${u})"/>
      <rect width="420" height="640" fill="url(#dn${u})"/>
      ${o.under ? `<path d="${o.under}" fill="#000" fill-opacity=".13"/>` : ""}
      ${folds}
      ${o.inside || ""}
    </g>
    <path d="${o.body}" fill="none" stroke="${INK}" stroke-opacity=".3" stroke-width=".9" stroke-linejoin="round"/>
    ${piping}
    ${o.tie ? bow(o.tie[0], o.tie[1], o.tie[2] || 1) : ""}
    ${o.front || ""}
    </g>
  </svg>`;
}

// linen neck of the dress form, with an oak cap
const neck = `
  <path d="M176,100 C186,84 190,72 191,60 L223,58 C224,70 229,84 236,96 L225,198Z" fill="${LINEN}"/>
  <path d="M207,60 L223,58 C224,70 229,84 236,96 L225,198Z" fill="#000" fill-opacity=".07"/>
  <path d="M207,62 V190" stroke="#000" stroke-opacity=".12" stroke-width=".7" stroke-dasharray="2 3"/>
  <ellipse cx="207" cy="59" rx="16.500" ry="5" fill="${OAK}"/>
  <ellipse cx="207" cy="58" rx="11" ry="3.200" fill="none" stroke="${GRAIN}" stroke-width=".5"/>
  <ellipse cx="207" cy="58" rx="5.500" ry="1.600" fill="none" stroke="${GRAIN}" stroke-width=".5"/>
  <rect x="204" y="44" width="6" height="13" rx="2" fill="${OAK_D}"/><circle cx="207" cy="42" r="5" fill="${OAK}"/>`;

const ART = {
  dress: a => garment({
    poleTop: 500, behind: neck, tie: [262, 251],
    body: "M178,98 L132,112 C108,120 92,150 88,178 L126,190 C130,210 136,232 140,250 C120,330 92,430 74,518 C120,536 170,527 214,537 C260,547 302,529 340,521 C320,430 288,330 268,250 C274,225 280,200 284,180 L302,170 C300,145 291,125 276,112 L234,94 L224,196Z",
    under: "M262,250 C264,340 244,440 214,537 C260,547 302,529 340,521 C320,430 288,330 268,250Z",
    folds: ["M160,262 C150,340 128,440 112,526", "M196,262 C192,350 178,450 166,530", "M232,262 C232,350 226,430 214,500", "M286,300 C298,380 312,450 322,522", "M150,130 C146,160 150,200 158,244"],
    inside: `<path d="M138,240 C180,252 228,252 270,240 L272,262 C228,274 180,274 136,262Z" fill="#000" fill-opacity=".1"/>`,
    piping: ["M178,98 L224,196 C240,214 252,232 262,250", "M234,94 L224,196", "M262,252 C264,340 244,440 214,537", "M88,178 L126,190", "M284,180 L302,170",
      "M74,518 C120,536 170,527 214,537 C260,547 302,529 340,521"]
  }, a),

  top: a => garment({
    poleTop: 500, shift: 118, tie: [262, 251, .9],
    behind: neck + `<path d="M146,320 C148,372 170,396 208,398 C246,396 266,372 268,322Z" fill="${LINEN}"/>
      <path d="M208,398 C246,396 266,372 268,322 L208,322Z" fill="#000" fill-opacity=".07"/>
      <ellipse cx="208" cy="398" rx="14" ry="4" fill="${OAK_D}"/>`,
    body: "M178,98 L132,112 C108,120 92,150 88,178 L126,190 C130,210 136,232 140,250 C134,280 124,310 114,334 C160,348 200,341 226,349 C256,355 282,343 298,337 C290,306 276,276 268,250 C274,225 280,200 284,180 L302,170 C300,145 291,125 276,112 L234,94 L224,196Z",
    under: "M262,250 C262,290 246,322 226,349 C256,355 282,343 298,337 C290,306 276,276 268,250Z",
    folds: ["M162,262 C156,290 146,316 138,338", "M204,262 C202,292 196,320 190,344", "M150,130 C146,160 150,200 158,244"],
    inside: `<path d="M138,240 C180,252 228,252 270,240 L272,262 C228,274 180,274 136,262Z" fill="#000" fill-opacity=".1"/>`,
    piping: ["M178,98 L224,196 C240,214 252,232 262,250", "M234,94 L224,196", "M262,252 C262,290 246,322 226,349", "M88,178 L126,190", "M284,180 L302,170",
      "M114,334 C160,348 200,341 226,349 C256,355 282,343 298,337"]
  }, a),

  pants: a => garment({
    poleTop: 300, tie: [270, 147],
    behind: `<path d="M150,142 C150,112 160,86 176,74 L250,72 C264,86 272,110 272,140Z" fill="${LINEN}"/>
      <path d="M212,73 L250,72 C264,86 272,110 272,140 L212,146Z" fill="#000" fill-opacity=".07"/>
      <ellipse cx="213" cy="73" rx="37.500" ry="8" fill="${OAK_L}" stroke="${GRAIN}" stroke-width=".5"/>
      <ellipse cx="213" cy="73" rx="29" ry="6" fill="none" stroke="${GRAIN}" stroke-width=".5" opacity=".8"/>
      <ellipse cx="213.500" cy="73" rx="20" ry="4.200" fill="none" stroke="${GRAIN}" stroke-width=".5" opacity=".8"/>
      <ellipse cx="214" cy="73" rx="11" ry="2.400" fill="none" stroke="${GRAIN}" stroke-width=".5" opacity=".8"/>
      <ellipse cx="214" cy="73" rx="3" ry=".8" fill="${GRAIN}"/>`,
    body: "M146,134 C190,145 236,145 276,132 L279,152 C300,270 330,410 354,542 C318,558 270,561 232,549 L215,300 L200,553 C160,562 110,563 68,549 C96,420 120,280 143,154Z",
    under: "M268,154 C282,280 264,430 246,553 C290,560 326,554 354,542 C330,410 300,270 279,152Z",
    folds: ["M176,166 C166,300 146,440 130,556", "M158,170 C140,300 112,440 94,552", "M246,166 C252,300 250,430 244,548", "M300,300 C312,390 326,470 336,546", "M214,300 C212,240 214,200 216,166"],
    inside: `<path d="M143,152 C190,165 236,165 280,151 L282,164 C236,178 190,178 141,165Z" fill="#000" fill-opacity=".12"/>`,
    piping: ["M146,134 C190,145 236,145 276,132", "M143,154 C190,166 236,166 279,152", "M268,156 C282,280 264,430 246,553",
      "M68,549 C110,563 160,562 200,553", "M232,549 C270,561 318,558 354,542"]
  }, a),

  poncho: a => garment({
    poleTop: 500, shift: 106, tie: [210, 124, .62],
    behind: `<path d="M186,102 C190,86 191,74 191,60 L223,58 C224,72 228,88 236,98Z" fill="${LINEN}"/>
      <ellipse cx="207" cy="59" rx="16.500" ry="5" fill="${OAK}"/><ellipse cx="207" cy="58" rx="9" ry="2.600" fill="none" stroke="${GRAIN}" stroke-width=".5"/>
      <rect x="204" y="44" width="6" height="13" rx="2" fill="${OAK_D}"/><circle cx="207" cy="42" r="5" fill="${OAK}"/>`,
    body: "M186,98 C140,128 92,220 62,328 C108,368 158,402 204,428 C252,398 302,358 342,314 C322,222 284,128 236,96 C226,116 198,118 186,98Z",
    under: "M210,124 C214,230 210,330 204,428 C252,398 302,358 342,314 C322,222 284,128 236,96 C226,116 214,120 210,124Z",
    folds: ["M176,128 C146,200 116,280 96,352", "M196,134 C182,230 166,320 150,392", "M240,124 C268,200 296,270 318,336", "M226,130 C234,230 234,320 228,410"],
    piping: ["M186,98 C198,118 226,116 236,96", "M210,124 C214,230 210,330 204,428", "M62,328 C108,368 158,402 204,428 C252,398 302,358 342,314"]
  }, a)
};

// tripod floor lamp: oak legs, linen drum shade. Origin = floor centre.
function lampG(u, glow) {
  const leg = (x, y, w, f) => `<path d="M${-w},-268 L${x - w},${y} L${x + w},${y} L${w},-268Z" fill="${f}"/>
    <path d="M0,-266 L${x},${y}" stroke="${GRAIN}" stroke-width=".7" opacity=".7"/>`;
  return `
  <ellipse cx="6" cy="10" rx="84" ry="9" fill="#000" opacity="${glow ? .5 : .26}" filter="url(#bl${u})"/>
  ${glow ? `<path class="glow" d="M-58,-262 L-190,24 H190 L58,-262Z" fill="url(#cone${u})"/><circle class="glow" cx="0" cy="-262" r="230" fill="url(#halo${u})"/>` : ""}
  ${leg(52, -8, 3.2, OAK_D)}${cutEnd(52, -8, 3.4, 1.8)}
  ${leg(-54, 0, 3.4, OAK)}${cutEnd(-54, 0, 3.6, 1.9)}
  ${leg(8, 14, 3.8, OAK_L)}${cutEnd(8, 14, 4, 2.1)}
  <rect x="-2" y="-300" width="4" height="40" fill="#8a8172"/>
  <path d="M-46,-354 C-46,-342 46,-342 46,-354 L60,-264 C60,-246 -60,-246 -60,-264Z" fill="${glow ? "#F4D7A4" : "#F2EADC"}"/>
  <path d="M-46,-354 C-46,-342 46,-342 46,-354 L60,-264 C60,-246 -60,-246 -60,-264Z" fill="url(#wv${u})"/>
  <path d="M-46,-354 C-46,-342 46,-342 46,-354 L60,-264 C60,-246 -60,-246 -60,-264Z" fill="url(#lt${u})" opacity="${glow ? .5 : .8}"/>
  <ellipse cx="0" cy="-354" rx="46" ry="8" fill="${glow ? "#FBE9C6" : "#E4DACA"}"/>
  <path d="M-60,-264 C-60,-246 60,-246 60,-264" fill="none" stroke="${glow ? "#C79A65" : "#B9B6AE"}" stroke-width="2"/>
  <path d="M-46,-354 C-46,-342 46,-342 46,-354" fill="none" stroke="${glow ? "#C79A65" : "#B9B6AE"}" stroke-width="1.6"/>`;
}
const lampDefs = u => `<defs>
  <linearGradient id="cone${u}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#F6CF8E" stop-opacity=".42"/><stop offset="1" stop-color="#F6CF8E" stop-opacity="0"/></linearGradient>
  <radialGradient id="halo${u}"><stop offset="0" stop-color="#FFE2A8" stop-opacity=".5"/><stop offset=".45" stop-color="#F6CF8E" stop-opacity=".12"/><stop offset="1" stop-color="#F6CF8E" stop-opacity="0"/></radialGradient></defs>`;

ART.lamp = () => { const u = ++uidN; return `<svg viewBox="-210 -400 420 440" preserveAspectRatio="xMidYMax meet">${defs(u)}${lampDefs(u)}${lampG(u, true)}</svg>`; };

// hero: curved studio wall, window light, the dress and a floor lamp
ART.hero = () => {
  const u = ++uidN;
  const panes = (x, y, w, h, g) => [0, 1].map(c => [0, 1, 2].map(r => `<rect x="${x + c * (w + g)}" y="${y + r * (h + g)}" width="${w}" height="${h}"/>`).join("")).join("");
  return `<svg viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMax slice">${defs(u)}${lampDefs(u)}
  <defs>
    <linearGradient id="wall${u}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#F6F0E6"/><stop offset=".6" stop-color="#F1E9DC"/><stop offset=".8" stop-color="#E9DECC"/><stop offset="1" stop-color="#E2D4BE"/>
    </linearGradient>
    <linearGradient id="curve${u}" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#6B4A33" stop-opacity=".1"/><stop offset=".22" stop-color="#6B4A33" stop-opacity="0"/>
      <stop offset=".72" stop-color="#6B4A33" stop-opacity="0"/><stop offset="1" stop-color="#6B4A33" stop-opacity=".2"/>
    </linearGradient>
    <linearGradient id="cove${u}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#6B4A33" stop-opacity="0"/><stop offset=".55" stop-color="#6B4A33" stop-opacity=".09"/><stop offset="1" stop-color="#6B4A33" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft${u}"><feGaussianBlur stdDeviation="7"/></filter>
  </defs>
  <rect width="1440" height="900" fill="url(#wall${u})"/>
  <rect y="610" width="1440" height="170" fill="url(#cove${u})"/>
  <rect width="1440" height="900" fill="url(#curve${u})"/>
  <g class="light" filter="url(#soft${u})" fill="#FFFCF2">
    <g transform="skewX(-17)" opacity=".85">${panes(700, 70, 170, 168, 16)}</g>
    <g transform="translate(0 706) skewX(-60)" opacity=".5">${[0, 1].map(c => `<rect x="${510 + c * 186}" y="6" width="170" height="74"/><rect x="${510 + c * 186}" y="92" width="170" height="90"/>`).join("")}</g>
  </g>
  <g transform="translate(1296 826) scale(1.42)">${lampG(u, false)}</g>
  ${ART.dress('x="770" y="170" width="452" height="689"')}
  </svg>`;
};

// a length of cloth laid over an oak board (cathedral grain on the face, growth rings on the cut end)
ART.bolt = () => {
  const u = ++uidN;
  const arches = [0, 1, 2, 3, 4].map(k => `<path d="M-20,${27 + k * 1.7} Q${330 - k * 52},35 -20,${43 - k * 1.7}" fill="none" stroke="${GRAIN}" stroke-width=".8" opacity=".75"/>`).join("");
  const rings = [1, 2, 3, 4, 5, 6, 7].map(k => `<ellipse cx="14" cy="84" rx="${k * 5}" ry="${k * 8.5}" fill="none" stroke="${GRAIN}" stroke-width=".8" opacity=".8"/>`).join("");
  const front = "M262,42 H974 V88 C900,96 820,84 740,90 C640,97 560,84 470,90 C390,95 320,86 264,92Z";
  const topf = "M232,23 H946 L974,42 H262Z";
  return `<svg viewBox="0 0 1000 110" preserveAspectRatio="xMinYMid slice">${defs(u)}
    <rect x="24" y="80" width="960" height="14" fill="${INK}" opacity=".3" filter="url(#bl${u})"/>
    <path d="M30,44 H970 V80 H30Z" fill="${OAK}"/>
    <path d="M30,52 H970 M30,61 H970 M30,66 H970 M30,74 H970" stroke="${GRAIN}" stroke-width=".6" opacity=".55"/>
    <path id="tf${u}" d="M30,44 L4,26 H944 L970,44Z" fill="${OAK_L}"/>
    <clipPath id="tc${u}"><path d="M30,44 L4,26 H944 L970,44Z"/></clipPath><g clip-path="url(#tc${u})">${arches}</g>
    <path d="M30,44 L4,26 V62 L30,80Z" fill="#E3C198"/>
    <clipPath id="ec${u}"><path d="M30,44 L4,26 V62 L30,80Z"/></clipPath><g clip-path="url(#ec${u})">${rings}</g>
    <path d="M30,44 L4,26 V62 L30,80Z M30,44 V80" fill="none" stroke="${GRAIN}" stroke-width=".6"/>
    <path class="cg" d="${topf}"/><path d="${topf}" fill="url(#wv${u})"/><path d="${topf}" fill="#fff" fill-opacity=".14"/>
    <path class="cg" d="${front}"/><path d="${front}" fill="url(#wv${u})"/><path d="${front}" fill="url(#dn${u})"/>
    <path d="M340,44 C338,60 344,76 340,90 M520,44 C524,60 516,76 520,88 M700,44 C696,60 704,76 702,90 M860,44 C864,60 856,76 860,90" stroke="#000" stroke-opacity=".12" stroke-width="1.2" fill="none"/>
    <path d="M262,42 H974" stroke="#000" stroke-opacity=".18" stroke-width="1"/>
    <path class="cts" d="M232,23 L262,42 L264,92" stroke-width="2.4" stroke-linejoin="round"/>
  </svg>`;
};

// a pinked-edge swatch of the tie cloth
ART.swatch = () => {
  const u = ++uidN; let p = [], n = 10, s = 100 / n;
  for (let i = 0; i < n; i++) p.push(`${i * s},3 ${i * s + s / 2},0`);
  for (let i = 0; i < n; i++) p.push(`97,${i * s} 100,${i * s + s / 2}`);
  for (let i = n; i > 0; i--) p.push(`${i * s},97 ${i * s - s / 2},100`);
  for (let i = n; i > 0; i--) p.push(`3,${i * s} 0,${i * s - s / 2}`);
  return `<svg viewBox="0 0 100 100">${defs(u)}<polygon class="ct" points="${p.join(" ")}"/><polygon points="${p.join(" ")}" fill="url(#wv${u})"/>
    <polygon points="${p.join(" ")}" fill="url(#lt${u})" opacity=".6"/><rect x="10" y="10" width="80" height="80" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1" stroke-dasharray="4 3"/></svg>`;
};

// exploded drawing of the wrap pants
ART.exploded = () => {
  const u = ++uidN;
  const piece = (d, dx, dy, n, lx, ly, label, cls = "cg") => `<g class="piece" style="--dx:${dx}px;--dy:${dy}px">
    <path d="${d}" fill="${INK}" opacity=".22" filter="url(#sf${u})" transform="translate(10 16)"/>
    <path class="${cls}" d="${d}"/><path d="${d}" fill="url(#wv${u})"/><path d="${d}" fill="url(#lt${u})" opacity=".7"/>
    <path d="${d}" fill="none" stroke="${INK}" stroke-opacity=".35" stroke-width=".9"/>
    <path d="${d}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1" stroke-dasharray="5 4" transform="translate(${lx} ${ly}) scale(.9) translate(${-lx} ${-ly})" style="transform-box:view-box"/>
    <circle cx="${lx}" cy="${ly}" r="17" fill="#F7F2EA" stroke="${INK}" stroke-width=".8"/>
    <text x="${lx}" y="${ly + 4.500}" text-anchor="middle" font-size="14" font-weight="500" fill="${INK}">${n}</text>
    <text x="${lx}" y="${ly + 40}" text-anchor="middle" font-size="13" font-weight="500" letter-spacing="2" fill="${INK}">${label}</text></g>`;
  return `<svg viewBox="0 0 640 640" font-family="Epilogue, sans-serif">${defs(u)}
  <g transform="matrix(1,-.1,0,1,0,62)">
    <g stroke="${INK}" stroke-width=".9" stroke-dasharray="3 5" opacity=".55" fill="none">
      <path d="M200,96 V150 M440,96 V150 M144,76 H150 M490,76 H496 M300,400 H340"/>
    </g>
    ${piece("M150,60 H490 V92 H150Z", 0, 34, 1, 320, 76, "", "cg")}
    ${piece("M14,68 H140 V84 H14Z", 34, 34, 2, 76, 76, "", "ct")}
    ${piece("M500,68 H626 V84 H500Z", -34, 34, 2, 564, 76, "", "ct")}
    ${piece("M110,150 H290 C296,200 300,240 286,270 L300,560 H80 C84,420 96,280 110,150Z", 20, -26, 3, 192, 360, "FRONT PANEL")}
    ${piece("M350,150 H530 C544,280 556,420 560,560 H340 L354,270 C340,240 344,200 350,150Z", -20, -26, 4, 448, 360, "BACK PANEL")}
    <text x="320" y="44" text-anchor="middle" font-size="13" font-weight="500" letter-spacing="2" fill="${INK}">WAISTBAND</text>
    <text x="76" y="52" text-anchor="middle" font-size="13" font-weight="500" letter-spacing="2" fill="${INK}">TIE</text>
    <text x="564" y="52" text-anchor="middle" font-size="13" font-weight="500" letter-spacing="2" fill="${INK}">TIE</text>
  </g></svg>`;
};

// the measuring drawing that draws itself
ART.plan = () => {
  const L = (d, delay, extra = "") => `<path class="draw" pathLength="1" style="--d:${delay}" d="${d}" ${extra}/>`;
  const tag = (x, y, t, name, delay) => `<g class="lbl" style="--d:${delay}"><circle cx="${x}" cy="${y}" r="15" fill="#F05A28"/>
    <text x="${x}" y="${y + 4.500}" text-anchor="middle" font-size="14" font-weight="500" fill="#fff">${t}</text>
    <text x="${x + 24}" y="${y + 5}" font-size="14" font-weight="500" letter-spacing="2" fill="${INK}">${name}</text></g>`;
  let grid = "";
  for (let x = 40; x <= 440; x += 40) grid += `M${x},40 V600 `;
  for (let y = 40; y <= 600; y += 40) grid += `M40,${y} H440 `;
  return `<svg viewBox="0 0 480 640" font-family="Epilogue, sans-serif" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="${grid}" stroke="${INK}" stroke-opacity=".07" stroke-width="1"/>
    <g stroke="${INK}" stroke-width="1.6">
      ${L("M190,110 L152,124 C140,150 136,172 138,190 C146,220 156,244 164,262 C140,360 116,470 100,560 H340 C324,470 300,360 276,262 C284,244 294,220 302,190 C304,172 300,150 288,124 L250,110 L220,205 Z", 0)}
      ${L("M220,205 C242,230 266,250 276,262 C272,370 252,470 232,560", .9)}
      ${L("M276,262 C262,250 248,254 252,264 C256,272 268,270 276,262 C288,250 302,254 298,264 C294,272 284,270 276,262 M274,266 C272,290 266,310 258,326 M279,266 C286,288 292,302 300,314", 1.4)}
    </g>
    <g stroke="${"#6B4A33"}" stroke-width="1.2" stroke-dasharray="none">
      ${L("M138,190 H302 M138,183 V197 M302,183 V197", 1.9)}
      ${L("M164,262 H276 M164,255 V269", 2.2)}
      ${L("M146,330 H294 M146,323 V337 M294,323 V337", 2.5)}
      ${L("M68,110 V560 M61,110 H75 M61,560 H75", 2.8)}
    </g>
    ${tag(336, 190, "A", "BUST", 2.3)}${tag(336, 248, "B", "WAIST", 2.6)}${tag(336, 330, "C", "HIPS", 2.9)}${tag(68, 86, "D", "LENGTH", 3.2)}
    <text class="lbl" style="--d:3.4" x="440" y="622" text-anchor="end" font-size="11" font-weight="500" letter-spacing="2" fill="${INK}" opacity=".5">NOT TO SCALE</text>
  </svg>`;
};

$$("[data-art]").forEach(el => { const f = ART[el.dataset.art]; if (f) el.innerHTML = f(""); });

/* ============ WORD-BY-WORD HEADLINES ============ */
$$("[data-split]").forEach(el => {
  let i = 0;
  el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
  [...el.childNodes].forEach(node => {
    if (node.nodeType !== 3) return;
    const frag = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach(part => {
      if (!part) return;
      if (/^\s+$/.test(part)) { frag.append(" "); return; }
      const w = document.createElement("span"); w.className = "w"; w.setAttribute("aria-hidden", "true");
      const s = document.createElement("span"); s.textContent = part; s.style.setProperty("--i", i++);
      w.append(s); frag.append(w);
    });
    node.replaceWith(frag);
  });
});

/* ============ RISE INTO PLACE ============ */
const targets = $$(".reveal, .rise, [data-split], .plan, .exploded");
if ("IntersectionObserver" in window && !reduced) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: .15, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(t => io.observe(t));
} else targets.forEach(t => t.classList.add("in"));

/* ============ WHATSAPP LINKS ============ */
const wa = text => `https://wa.me/${SETTINGS.whatsappNumber}?text=${encodeURIComponent(text)}`;
$$("[data-wa]").forEach(a => { a.href = wa(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });

/* ============ THE FITTING ROOM (configurator) ============ */
const config = $(".config"), stageEl = $(".stage");
const state = { step: -1, garment: "dress" };
const out = { name: $("#cfg-name"), copy: $("#cfg-copy"), price: $("#cfg-price"), date: $("#cfg-date"), count: $("#cfg-count"), order: $("#cfg-order") };

function readyDate(weeks) {
  const d = new Date(); d.setDate(d.getDate() + weeks * 7);
  return d.toLocaleDateString("en-ZA", { day: "numeric", month: "long" });
}
function swapText(el, text) {
  if (el.textContent === text) return;
  if (reduced) { el.textContent = text; return; }
  el.classList.add("out");
  setTimeout(() => { el.textContent = text; el.classList.remove("out"); }, 320);
}
function render() {
  const f = SETTINGS.finishes[state.step], piece = state.garment === "dress" ? "wrap dress" : "wrap pants";
  stageEl.dataset.finish = state.step;
  swapText(out.name, f.name); swapText(out.copy, f.copy);
  swapText(out.price, SETTINGS.prices[state.garment]); swapText(out.date, readyDate(f.leadWeeks));
  out.count.textContent = "0" + (state.step + 1);
  $$(".sw").forEach((b, i) => { b.classList.toggle("is-on", i === state.step); b.setAttribute("aria-pressed", i === state.step); });
  $$(".toggle button").forEach(b => { const on = b.dataset.pick === state.garment; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
  $$(".stage-art").forEach(a => a.classList.toggle("is-on", a.dataset.garment === state.garment));
  out.order.href = wa(`Hello All Wrapped Up, I'd like to order the ${piece} in ${f.short}.`);
  out.order.target = "_blank"; out.order.rel = "noopener";
}
function setStep(i) { if (i !== state.step) { state.step = i; render(); } }

// scrolling through the pinned section steps through the three finishes
function onScroll() {
  const r = config.getBoundingClientRect(), span = r.height - window.innerHeight;
  const p = Math.min(1, Math.max(0, -r.top / span));
  setStep(Math.min(2, Math.floor(p * 3)));
}
let ticking = false;
window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

// clicking a swatch does the same thing: it moves the page to that finish
$$(".sw").forEach(b => b.addEventListener("click", () => {
  const i = +b.dataset.step, span = config.offsetHeight - window.innerHeight;
  const top = config.getBoundingClientRect().top + window.scrollY + span * ((i + .5) / 3);
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  setStep(i);
}));
$$(".toggle button").forEach(b => b.addEventListener("click", () => { state.garment = b.dataset.pick; render(); }));

/* ============ ORDER FORM → WHATSAPP ============ */
$("#order-form").addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(e.target), v = k => (d.get(k) || "").toString().trim();
  if (!v("name")) { e.target.elements.name.focus(); return; }
  const m = [["Bust", "bust"], ["Waist", "waist"], ["Hips", "hips"], ["Length", "length"]].filter(([, k]) => v(k)).map(([n, k]) => `${n} ${v(k)} cm`);
  const lines = [`Hello All Wrapped Up, I'm ${v("name")}.`, `I'd like to order: ${v("piece")}`, `Colour: ${v("colour")}`];
  if (m.length) lines.push(`Measurements: ${m.join(", ")}`);
  if (v("note")) lines.push(`Note: ${v("note")}`);
  window.open(wa(lines.join("\n")), "_blank", "noopener");
});

$("#year").textContent = new Date().getFullYear();
