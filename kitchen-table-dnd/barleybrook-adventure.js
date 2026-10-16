/* ---------- heroes ---------- */
const HEROES=[
 {name:"Brinna Stoutshield",cls:"Dwarf Fighter",pro:"she / her",blurb:"Brave, strong, and extremely hard to knock over.",
  ac:13,hp:7,bg:"#d9c9a8",
  atk:{n:"Axe Swing",b:4,alt:"3d6+1",d:"Deals 1 point of axe damage."},
  spec:{n:"Shield Friend",d:"When a monster attacks a friend standing next to you, shout \"Not today!\" The attack hits your shield instead and does nothing at all. Once per fight."},
  good:{n:"Pushing, lifting and breaking things",b:4},
  art:{name:"Brinna",build:"broad",skin:"#7d5235",suit:"#9c3a2c",ear:"helm",iris:"#4e9ad6",chest:1,chestC:"#e8c07a",bgA:"#7a46b0",bgB:"#1b0f2c"}},
 {name:"Nim Sparkfizzle",cls:"Gnome Wizard",pro:"he / him",blurb:"Small, curious, and absolutely full of sparks.",
  ac:8,hp:4,bg:"#c8d4e8",
  atk:{n:"Zap",b:6,alt:"3d6+3",d:"Deals 1 point of zap damage. You can hit anything you can see — you never have to get close."},
  spec:{n:"Light!",d:"Make any dark place bright as noon. Or aim it at one monster: it is dazzled, and its next attack misses automatically."},
  good:{n:"Knowing strange and useful facts",b:5},
  art:{name:"Nim",build:"small",skin:"#e0bd8e",suit:"#3f5fa8",ear:"hat",iris:"#6fd0a8",bgA:"#3f5ec9",bgB:"#0d1230"}},
 {name:"Fen Quickfinger",cls:"Halfling Rogue",pro:"they / them",blurb:"Quiet, quick, and a little bit sneaky.",
  ac:11,hp:5,bg:"#c3d6c0",
  atk:{n:"Dagger Jab",b:6,alt:"3d6+3",d:"Deals 1 point of dagger damage."},
  spec:{n:"Sneak Attack",d:"If a friend is standing on the opposite side of the monster from you, your hit deals 2 damage instead of 1."},
  good:{n:"Sneaking, climbing and opening locks",b:6},
  art:{name:"Fen",build:"round",skin:"#b07d52",suit:"#3f7a4e",ear:"hood",iris:"#e0a24a",bgA:"#2f8a7a",bgB:"#07201f"}},
 {name:"Mara Bramblelight",cls:"Human Cleric",pro:"she / her",blurb:"Kind, loud, and the reason everyone is still standing.",
  ac:12,hp:6,bg:"#eedcc0",
  atk:{n:"Mace Bonk",b:4,alt:"3d6+1",d:"Deals 1 point of bonk damage."},
  spec:{n:"Healing Word",d:"Say something kind to a friend out loud. They rub out 2 filled circles. If they were knocked out, they wake up with 2 hit points. Twice per adventure."},
  good:{n:"Calming down people and animals",b:5},
  art:{name:"Mara",build:"balanced",skin:"#5e3a26",suit:"#e0a21a",ear:"none",hair:"#2a1a14",iris:"#8fd9b4",chest:1,chestC:"#fff0c0",bgA:"#a85a2e",bgB:"#2a0f10"}}
];

/* ---------- monsters ---------- */
const MONSTERS=[
 {name:"Grabby Goblin",count:"three of them",ac:10,hp:2,bg:"#c7d8b4",
  atk:{n:"Poky Stick",b:2,alt:"3d6",d:"Deals 1 point of poke damage."},
  spec:{n:"Snatch!",d:"Instead of attacking, a goblin grabs one thing a hero is holding and scampers away with it. Getting it back is its own little adventure."},
  tactics:"Goblins are cowards. When only one goblin is left standing, it drops everything it stole, squeaks, and runs away down a crack in the wall. Nobody has to hurt it. If a hero says something frightening, let that work.",
  art:{name:"Goblin",build:"small",skin:"#8fb466",suit:"#6b4a2a",ear:"pointy",brow:"angry",mouth:"fang",iris:"#ffd04a",bgA:"#5a8a3a",bgB:"#121f0c"}},
 {name:"Chompy the Mine Lizard",count:"one, asleep",ac:12,hp:6,half:3,bg:"#b9cfd6",
  atk:{n:"Big Chomp",b:3,alt:"3d6",d:"Deals 1 point of chomp damage."},
  spec:{n:"Tail Sweep",d:"When a hero misses Chompy, his tail knocks them over. They can still talk and move, but they lose their next attack getting up."},
  tactics:"Chompy is not evil. He is hungry, half blind, and sitting in the only tunnel. Any hero who throws him the dried sausage from the goblin sack gets past with no fight at all — that is a win, not a cheat. Say so out loud afterwards.",
  art:{name:"Chompy",build:"squat",skin:"#6f9ba8",suit:"#4a6b74",ear:"pointy",snout:"lizard",brow:"angry",mouth:"fang",iris:"#f0c044",bgA:"#2e8a8a",bgB:"#061c22"}},
 {name:"Clink, a Young Copper Dragon",count:"the boss",ac:13,hp:10,half:5,bg:"#e4b891",
  atk:{n:"Copper Note",b:4,alt:"3d6+1",d:"Deals 1 point of sound damage, and that hero's ears ring: their next attack is rolled twice and they must take the lower roll."},
  spec:{n:"Wing Gust",d:"Every hero standing close to Clink is blown back across the cave. They have to use their move to get close again."},
  tactics:"When Clink's fifth circle is filled, he stops fighting on his own. He sits down in the middle of the floor and cries, and the Harvest Bell rolls out of his claws. He was never trying to hurt anybody — he wanted to learn how to make a sound that beautiful.",
  art:{name:"Clink",build:"round",skin:"#d98a47",suit:"#8a4a22",ear:"horn",horn:"#e8c98a",snout:"dragon",brow:"sad",mouth:"open",iris:"#6fd0a8",bgA:"#8a4ab0",bgB:"#1e0f2e"}}
];

/* ---------- treasure ---------- */
const TREASURE=[
 {n:"40 gold pieces",d:"Ten each. Let them count the pile out loud — it is half the fun."},
 {n:"Two Potions of Healing",d:"Drink one on your turn: rub out 3 filled circles."},
 {n:"The Everbright Lantern",d:"It never goes out, not even underwater."},
 {n:"A wind-up music box",d:"It plays one short, sad little tune. This is the key to the last scene — do not explain that."}
];
const MAGIC=[
 {who:"Brinna",n:"Boots of the Stubborn Ox",d:"Nothing can push you, shove you or blow you over."},
 {who:"Nim",n:"Wand of Small Fires",d:"Light any candle from across the room. Once per fight, your Zap does 1 extra damage."},
 {who:"Fen",n:"Cloak of the Quiet Mouse",d:"When you sneak, roll two dice and keep the better one."},
 {who:"Mara",n:"Bell of Calm",d:"Ring it and one angry animal stops being angry and sits down."}
];

/* ---------- the map ---------- */
const ROOMS=[
 {n:1,x:92,y:96,t:"Mine Mouth",s:"start here"},
 {n:2,x:256,y:96,t:"Cart Room",s:"fight one"},
 {n:3,x:420,y:96,t:"Chompy’s Pool",s:"fight two, or sausage"},
 {n:4,x:548,y:244,t:"Three Bells",s:"the puzzle"},
 {n:5,x:376,y:244,t:"Glitter Hall",s:"treasure"},
 {n:6,x:204,y:244,t:"Singing Cave",s:"the boss"}
];
const MAPSVG=(()=>{
 const RX=76,RY=48;
 let tun="";
 for(let i=0;i<ROOMS.length-1;i++){
  const a=ROOMS[i],b=ROOMS[i+1];
  tun+=`<path d="M${a.x} ${a.y} L${b.x} ${b.y}" stroke="var(--line)" stroke-width="17" stroke-linecap="round" opacity=".45" fill="none"/>`;
 }
 const rooms=ROOMS.map(r=>`<ellipse cx="${r.x}" cy="${r.y}" rx="${RX}" ry="${RY}" fill="var(--cave)" stroke="var(--line)" stroke-width="4"/>`).join("");
 const labels=ROOMS.map(r=>`<text x="${r.x}" y="${r.y-13}" text-anchor="middle" font-family="var(--display)" font-size="22" font-weight="700" fill="var(--copper)">${r.n}</text>`+
  `<text x="${r.x}" y="${r.y+8}" text-anchor="middle" font-family="var(--body)" font-size="14.5" font-weight="700" fill="var(--ink)">${r.t}</text>`+
  `<text x="${r.x}" y="${r.y+27}" text-anchor="middle" font-family="var(--body)" font-size="11" font-weight="600" fill="var(--muted)">${r.s}</text>`).join("");
 return `<svg viewBox="0 0 640 340" role="img" aria-label="Map of the Old Copperfoot Mine: six rooms in a line">`+
  `<rect width="640" height="340" fill="var(--stone)"/>${tun}${rooms}${labels}`+
  `<path d="M92 14 L92 42" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/>`+
  `<path d="M85 34 L92 44 L99 34" fill="none" stroke="var(--line)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`+
  `<text x="92" y="10" text-anchor="middle" font-family="var(--body)" font-size="11.5" font-weight="700" fill="var(--muted)">daylight</text>`+
  `</svg>`;
})();
