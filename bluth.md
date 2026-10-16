# Bluth: first principles

Working notes for the Copperfoot art engine. Two sections: what Don Bluth and his
collaborators actually say, with sources; and the rules I derived by reading the two
reference frames directly, which is where most of the practical drawing guidance comes
from. I've kept those separate on purpose — a lot of what's written about Bluth online is
content-farm filler, and I'd rather mark the line than blur it.

---

## 1. Sourced

**The three principles Bluth names himself.** On his own site, the tutorial is built on
*squash and stretch, overlapping action, and timing* — taught through the physics of a
bouncing ball losing energy across bounces, then applied to a character's hops and jumps.
The stated goal of all three: **characters must appear to have weight.**
([donbluthanimation.com](https://donbluthanimation.com/products02.htm))

**Weight is the whole game.** Not detail, not polish. A drawing reads as alive when it
reads as heavy — when it looks like gravity has an opinion about it.

**Learn the rules, then draw as you please.** Bluth's own framing: absorb the established
rules first, then develop your own expression. Even working from a model sheet, every
artist's interpretation differs, and that difference is the point, not an error.
([donbluthanimation.com](https://donbluthanimation.com/products02.htm))

**Don't illustrate — provoke.** On storyboarding: the job isn't to draw what the script
says, it's to use the picture to create an emotional response while keeping the story's
spirit. Bluth puts story above craft outright: *"A good story can be poorly animated and
it will still play for the audience."*
([AWN review of *The Art of Storyboard*](https://www.awn.com/animationworld/don-bluths-art-storyboard-review))

**Exaggeration grounded in real anatomy.** The recurring description of his character work:
exaggerated proportions and expressive features that still sit on a believable skeleton.
This is the difference that matters here — exaggeration *of* anatomy, never exaggeration
*instead of* anatomy.

**Chiaroscuro.** Stark light-to-shadow contrast, and backgrounds that carry mood rather
than sit behind the action. His films are famously darker than their competitors, in both
senses.

**Lineage.** The twelve principles everyone draws on were compiled by Frank Thomas and
Ollie Johnston in *The Illusion of Life* (1981). Bluth teaches from the same physics-first
tradition. ([Twelve basic principles](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation))

---

## 2. Read off the reference frames

From the *Dragon's Lair* key art (Dirk) and the *All Dogs Go to Heaven* still
(Charlie, Itchy, Anne-Marie). These are the rules the engine actually implements.

### Line
- **Thick black ink on every silhouette.** Not grey, not the fill colour darkened. Near-black,
  and heavy — this is the single biggest tell, and the thing vector art usually gets wrong.
- Line weight is **not uniform**: heaviest on the outer silhouette, lighter on interior
  detail (lids, lips, fingers).
- Joins are **round**. Bluth has no sharp corners on a living thing.

### Form
- **No circles for heads.** A skull is wide at the temples, narrows through the cheekbone,
  and tapers to a rounded chin. An ellipse reads instantly as a cartoon avatar; a tapered
  skull reads as a character.
- **The brow ridge exists** and casts the eyes into slight shadow. This alone adds more
  apparent realism than any amount of rendering.
- **Necks exist.** The jaw casts a shadow onto the neck. Heads that sit directly on
  shoulders read as toys.
- **A muzzle is a canine feature.** *All Dogs Go to Heaven* is a film about dogs, so the
  muzzle-and-nose-leather construction read off Charlie belongs to **dogs and wolves only**.
  Pasting it onto everything with a face is the single easiest way to make a cast look
  generic. Each creature gets its own anatomy:
  - **Dog / wolf** — muzzle with a top plane, a jaw line beneath, a big black nose leather
    on the end of a bridge, one white highlight.
  - **Dragon** — a tapering reptile wedge, nostrils as angled **slits** high on the snout,
    a wide mouth seam, a faint ridge down the centre. No nose pad.
  - **Mouse** — a short cone, a small pink nose at the tip, whiskers. Nothing heavy.
  - **Lizard** — a wide flat jaw, round nostrils near the tip, mouth line wider than the head.
  - **Human, elf, dwarf, gnome, halfling, orc** — **no snout at all.** A bridge, a wedge,
    two nostrils, lips.
- **Insects and machines get neither** — beetles have mandibles and antennae, not faces.

### Eyes
- Large, but **almond, not round** — set on a slight outward tilt.
- The **upper lid cuts across the iris.** A fully visible circular iris reads as shock or
  stupidity; a lid covering the top quarter reads as a thinking creature. This is the
  cheapest realism in the whole face.
- Heavy inked upper lid with lashes at the outer corner. A thin lower lid line, nothing more.
- Iris has a dark rim and a lighter centre, one big catchlight, one small secondary.
- **No outline around the whole eyeball.** That reads as spectacles. The lid defines it.

### Colour and light
- **One hard key light**, usually high and to one side. Cel shading: flat base colour, one
  hard-edged shadow shape, one restrained highlight. No soft gradients on the character —
  gradients belong in the painted background.
- The terminator between lit and shadow is a **visible curved edge**. That edge is what sells
  a head as a sphere with a jaw rather than a flat shape.
- **Warm characters against cool grounds.** Dirk's orange against violet; Charlie's tan
  against blue. The complementary clash does the staging work.
- A **soft halo** of light separates the character from the painted background.
- Backgrounds are **painted and soft** — gradients, atmosphere, no ink — so the crisp inked
  character pops against them.

### Staging
- Silhouette first: if it doesn't read in black, the detail won't save it.
- Dark framing elements at the edges (briars, branches, architecture) push the eye to the
  lit focal point.

---

## 2b. The contour clock — how races read

From a dedicated design research pass. The finding that reframed everything: this is a
documented, industry-wide failure, not a local mistake. Baldur's Gate 3 players report that
**with the ears covered, elves are indistinguishable from humans** — the complaint is
specifically that the *skull* isn't differentiated. On official 5e race sketches a commenter
said of the halflings, *"I would have had a hard time telling them apart from a couple of
regular humans."* A working artist called gnomes and halflings *"basically just the ears."*

The fix is that **every race breaks the silhouette at a different clock position**, and no
two may share a slot:

| Race | Break | Gestalt |
|---|---|---|
| Tiefling | 11 & 1 (crown) | horned bell |
| Elf | 10 & 2 (eye line), blades at 55° | needle-tipped wedge |
| Gnome | 9 & 3 (eye line), blunt paddles at 40° | wide "W" over a ball |
| Dragonborn | 4 & 8 (jaw corner frills) | finned box, no ears, no chin |
| Dwarf | 5 → 7 (the whole lower arc) | anvil — beard wider than the skull |
| Half-orc | 6 only (tusks breaking **upward**) | neckless inverted trapezoid |
| Halfling | 12, scalloped | apple — widest at the cheek, lumpy crown |
| Human | none | clean egg — identity by being the only unbroken outline |

Supporting rules, each of which is nearly free:

- **Head : shoulder ratio is a race constant, not a character knob** — 0.44 (half-orc) to
  0.70 (halfling). In a head-and-shoulders crop this encodes *size* without drawing a body.
  Let the big races clip the frame edge and the small ones float inside it.
- **Nose is a 2D axis**: plot width against length and let no two races share a quadrant.
  Dwarf wide-short bulb, gnome narrow-long bulb, halfling snub button, elf narrow-long
  straight, half-orc broad-flat, dragonborn none (nostril slits on a muzzle).
- **Iris treatment is a species channel**: tiefling solid orb with no sclera, dragonborn
  vertical slit, dwarf large dark iris under a hooded lid, gnome oversized with a big
  catchlight, elf high-saturation with a limbal ring, half-orc small amber.
- **Ink weight varies by race**: 3.2 for dwarf/half-orc/dragonborn, 2.4 mid, 2.0 for
  elf/tiefling. Heavy line reads as mass, fine line as refinement.
- **Hair is a shape language, not a colour**: dwarf blunt lobes, gnome radiating tufts,
  halfling overlapping curls, elf long parallels, tiefling backswept flames, half-orc
  vertical crest, dragonborn scale plates, human one bold statement shape.
- **Colour is the weakest channel** — it fails in greyscale, in cheap CMYK and for the ~8%
  of boys with colour-vision deficiency. Every race must separate with the fill set to flat
  black first; colour is reinforcement, assigned by hue family.
- **Two failure directions to police**: halfling and gnome drift toward "human child",
  which kills them as heroes a child wants to *be* — fix with an adult marker and an eye
  line at 57% down the head, not 50%. Half-orc and tiefling drift toward "monster", which
  kills them as heroes a parent wants to buy — give them the two widest smiles in the set,
  blunt-tipped tusks and horns revealed *by the smile*. Menace is 90% brow angle: no
  inner-brow-up on any card.
- **Test protocol**: render all eight at 24mm in a row — colour, greyscale, solid black
  silhouette, 2px blur. If any two get swapped, the fix belongs in the contour clock, not
  in the face.

## 2c. Framing and pose

- **Crop in.** The head should fill the card, not sit on a plinth of shoulders. Scale the
  whole figure up about the eye line until the shoulders run off the bottom edge. A child
  looking at a 24mm card is looking at a face.
- **Necks are short and slim.** A long neck reads as a mannequin; it also costs frame that
  the face should be using. Shoulders sit about 13 units below the chin, and the neck is
  two-thirds the width an anatomy diagram would give it.
- **Front-on is not mandatory.** A small three-quarter turn (shift the features 5–8 units
  toward the turn, shrink the far eye by up to a third, leave the skull alone) plus 2–3° of
  head tilt is enough to break the mugshot row without rebuilding the skull system. Give
  every character their own turn and tilt, and alternate the direction down a lineup.
- **No floating highlight strokes on the face, and no halo.** Two separate attempts at
  Bluth's character-from-background separation both failed the same way. A rim-light stroke
  placed a few units inside the contour reads as a scar, not as light. A blurred light-
  coloured copy of the silhouette scaled up behind the head reads as a pale bar wherever it
  peeks past the contour — and because the sides of a head are the straightest part of it,
  that is exactly where it shows. Both appear on every card at once, which is how you know
  it is a systematic error and not a drawing. Separate the character from the ground with
  **the background instead**: a darker vignette at the frame edge and a lighter pool behind
  the head. Nothing light-coloured goes near the silhouette edge.
- **Build the skull as one smooth closed curve** through its width points (crown, temple,
  cheek, jaw, chin), with tangent-continuous handles — not as separate cubic segments with
  a straight line across the chin. Segment joins and that flat chin are where "angular"
  comes from. Faces are round; only the appendages (horns, blades, tusks, frills) are sharp.
- **A beard attaches below the cheekbone, not under the eye.** Attached high it reads as a
  mask or a balaclava. The top edge sags *below* the nose in the middle and rises to the
  ears at the sides, with a separate narrower moustache a shade lighter than the beard —
  and the bulbous nose sits clear above both. If you cannot see the nose, the beard is wrong.

## 3. House rules for this project

1. **Exaggerate proportion, never skip structure.** Eyes can be twice life size; the brow,
   cheek, jaw and neck still have to be there underneath.
2. **Ink everything, gradient nothing** — on characters. Backgrounds are the opposite.
3. **Every face gets a terminator.** One hard shadow edge, consistent light direction across
   every character in the set, or the set stops looking like one world.
4. **Readable at 24mm.** These print at trading-card size. If a detail disappears at that
   scale it's costing ink for nothing.
5. **Light grounds for anything that prints.** Bluth's own daylight palette (the *All Dogs*
   sky) is bright — so printing light is faithful, not a compromise.
6. **One naming convention across every race.** Every character gets an invented given
   name plus a compound trade-or-nature surname — Stoutshield, Sparkfizzle, Quickfinger,
   Bramblelight, Tidewright, Larksong, Thornwhisper, Coalhammer. No real-world ethnic
   surnames, and no diminutives or nicknames for some characters while others get full
   fantasy names: that mismatch reads as a judgement about who is a *real* hero and who is
   a sidekick. Skin tone is set per character and carries **no** relationship to the name,
   so the cast varies on both axes independently.
7. **No two characters share a build.** An ensemble where every face is the same oval
   with the same eyes reads as uncanny, not stylised — real casts differ most in the head.
   The engine holds named builds (`hulking`, `broad`, `squat`, `balanced`, `tall`, `lean`,
   `round`, `small`, `slender`), and each sets:
   - **skull** — temple width, jaw taper, crown height, chin length
   - **body** — shoulder spread, neck thickness, shoulder height
   - **eyes** — size, spacing, roundness, tilt, brow weight
   - **scale** — overall size in frame, so a gnome at 0.88 and a dwarf barbarian at 1.12
     read as different creatures before you register a single feature
   Eye size alone spans 7.4 to 11.6 across the cast. Every character is assigned a build,
   and no two heroes share one.
8. **Kindness in the face.** These are for a seven-year-old. Villains get heavy brows and
   fangs, but every creature keeps a readable, warm eye. Bluth's monsters are frightening;
   they are never cruel to look at.
