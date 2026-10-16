# Kitchen Table D&D — template

A simplified D&D for a 6–8 year old, and the SVG portrait engine that illustrates it.
Two adventures, 8 pre-made heroes across 8 races, a 30-card treasure deck, and print
packs that come out on white paper.

The art rules this engine implements are in [`../bluth.md`](../bluth.md). Read that before
changing anything in `portrait-engine.js` — most of what looks like an arbitrary number in
there is a rule with a reason, and several of them are scars from getting it wrong.

## Build

```sh
node build-pages.js              # → dist/*.html          (the two adventure pages)
node build-print-copperfoot.js   # → print-copperfoot.html
node build-print-barleybrook.js  # → print-barleybrook.html
node render-pdfs.js              # → dist/*.pdf           (needs headless Chromium)
```

`build-pages.js` syntax-checks the inlined script as it goes, so a broken data file fails
the build rather than the browser.

Open `race-test.html` to see all eight races at full size, at 24mm, in greyscale and as
silhouettes — that's the test protocol from `bluth.md §2b`. Any two that get confused at
24mm is a contour-clock problem, not a face problem.

## Files

| File | What it is |
|---|---|
| `portrait-engine.js` | The whole art system. `figure(spec)` → SVG portrait; `icon(kind)` → treasure art. Holds the `RACES` table. |
| `roster.js` | The 8 heroes — stats, moves, pronouns, art spec. Shared by both adventures. |
| `copperfoot-data.js` | Adventure two: 30-card treasure deck, cast, branching node map. |
| `barleybrook-cast.js` | Adventure one: cast and the six-room map. |
| `barleybrook-adventure.js` | Adventure one's treasure, magic items and legacy tables. |
| `page-*.html` | The two adventure pages. Shared stylesheet; `/*__MARKERS__*/` get the data inlined at build. |
| `build-print-*.js` | Generate the print HTML — cards at 2.5×3.4in, 9 to a Letter page. |
| `race-test.html` | The lineup test. |

## The engine in one paragraph

Every character is one object. `race` selects a row from `RACES`, which sets skull geometry
(temple, cheek, jaw, chin widths; crown and chin heights), head-to-shoulder ratio, eye size,
spacing, roundness and tilt, brow weight, nose width *and* length, iris treatment, ink
weight, hair shape language, and which **contour tell** it carries. Per character you then
set colours (`skin`, `suit`, `hair`, `iris`, `horn`), expression (`brow`, `mouth`), pose
(`turn`, `tilt`) and `light: true` for print. The skull is one smooth closed curve through
its width points — no segment joins, because joins are where "angular" comes from.

## Adding a character

```js
{name:"Someone Something", cls:"Elf Druid", pro:"she / her",
 blurb:"One line a child can picture.", ac:11, hp:6,
 atk:{n:"Thorn Lash", b:5, alt:"3d6+2", d:"1 point of thorn damage."},
 spec:{n:"Wild Shape", d:"What it does, in a sentence."},
 good:{n:"What they're good at", b:6},
 art:{name:"Someone", race:"elf", turn:-0.18, tilt:2,
      bgA:"#3f8a5a", bgB:"#0a1f14",      // lit ground, shadow ground
      skin:"#b0703f", suit:"#2f6b4a", hair:"#d4cbb4", iris:"#7fd9c4"}}
```

`alt` is the three-d6 fallback for households without a d20 — keep it on every attack.

## Adding a race

Add a row to `RACES` and claim an **unused contour-clock slot** (`bluth.md §2b`). If the new
race's silhouette break collides with an existing one, both races get weaker. Then give it a
`tell` branch in `figure()` and, if it needs one, a hair shape language.

## Rules the game runs on

d20 + bonus vs AC, one point of damage per hit, hit points as circles you fill in, natural
20 does 1d6 instead, nobody dies. Lifted from Wizards' own free kids' adventure
*Monster Slayers: The Champions of the Elements*; the sources are credited on both pages.
