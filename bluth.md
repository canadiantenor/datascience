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
7. **Kindness in the face.** These are for a seven-year-old. Villains get heavy brows and
   fangs, but every creature keeps a readable, warm eye. Bluth's monsters are frightening;
   they are never cruel to look at.
