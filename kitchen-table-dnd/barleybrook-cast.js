/* ===== adventure one's cast, in the same shape as adventure two's ===== */
const CAST=[
 {t:"ally",name:"Tam the Lantern Mouse",role:"Hints, lantern, moral support.",ac:13,hp:3,
  atk:{n:"Tiny Rapier",b:4,alt:"3d6+1",d:"1 point of extremely indignant damage."},
  spec:{n:"I Know A Way",d:"Once per adventure, Tam finds a small door. The party skips any one obstacle."},
  note:"Give him to the grown-up. He is how you hand out hints without taking over the game.",
  art:{name:"Tam",turn:-0.28,tilt:3,race:"mouse",bgA:"#4a6bc9",bgB:"#0f1430",skin:"#c9a06a",suit:"#4a6b8a",iris:"#3f7a4e",rim:"#ffdca8",mouth:"smile",brow:"calm"}},
 {t:"foe",name:"Grabby Goblins",role:"Three of them, in a mine cart.",ac:10,hp:2,
  atk:{n:"Poky Stick",b:2,alt:"3d6",d:"1 point of poke damage."},
  spec:{n:"Snatch!",d:"Instead of attacking, a goblin grabs one thing a hero is holding and scampers off with it."},
  note:"Goblins are cowards. The moment only one is left it drops the sack, squeaks, and bolts down a crack in the wall. Nobody has to finish it off. If a hero says something frightening, let that work.",
  art:{name:"Goblin",turn:0.3,tilt:-3,race:"goblin",bgA:"#5a8a3a",bgB:"#121f0c",skin:"#8fb466",suit:"#6b4a2a",brow:"angry",mouth:"fang",iris:"#ffd04a"}},
 {t:"foe",name:"Chompy the Mine Lizard",role:"One, asleep, across the only path.",ac:12,hp:6,half:3,
  atk:{n:"Big Chomp",b:3,alt:"3d6",d:"1 point of chomp damage."},
  spec:{n:"Tail Sweep",d:"When a hero misses Chompy, his tail knocks them over. They can still talk and move, but they lose their next attack getting up."},
  note:"Chompy is not evil. He is hungry, half blind, and sitting in the only tunnel. Throw him the dried sausage from the goblin sack and the party walks past with no fight at all — that is a win, not a cheat, and you should say so out loud.",
  art:{name:"Chompy",turn:-0.24,tilt:2.5,race:"dragonborn",bgA:"#2e8a8a",bgB:"#061c22",skin:"#6f9ba8",suit:"#4a6b74",brow:"angry",mouth:"fang",iris:"#f0c044",horn:"#e6dcc2"}},
 {t:"boss",name:"Clink, a Young Copper Dragon",role:"Boss. About the size of a big dog.",ac:13,hp:10,half:5,
  atk:{n:"Copper Note",b:4,alt:"3d6+1",d:"1 point of sound damage, and that hero's ears ring: their next attack is rolled twice, keeping the worse."},
  spec:{n:"Wing Gust",d:"Everyone standing close is blown back across the cave and must use their move to get close again."},
  note:"At 5 filled circles Clink stops fighting on his own. He sits down and cries, and the Harvest Bell rolls out of his claws. He took it because it makes the most beautiful sound he has ever heard and he wanted to learn how. Nobody ever taught him anything.",
  art:{name:"Clink",turn:0.26,tilt:-3,race:"dragonborn",bgA:"#8a4ab0",bgB:"#1e0f2e",skin:"#d98a47",suit:"#8a4a22",brow:"sad",mouth:"open",iris:"#6fd0a8",rim:"#ffc98a",horn:"#e6dcc2"}}
];
/* six rooms in a line */
const ROOMS1=[
 {n:1,x:92,y:96,t:"Mine Mouth",s:"start here"},
 {n:2,x:256,y:96,t:"Cart Room",s:"fight one"},
 {n:3,x:420,y:96,t:"Chompy’s Pool",s:"fight two, or sausage"},
 {n:4,x:548,y:244,t:"Three Bells",s:"the puzzle"},
 {n:5,x:376,y:244,t:"Glitter Hall",s:"treasure"},
 {n:6,x:204,y:244,t:"Singing Cave",s:"the boss"}
];
const MAP1=(()=>{
 const RX=76,RY=48;let tun="";
 for(let i=0;i<ROOMS1.length-1;i++){const a=ROOMS1[i],b=ROOMS1[i+1];
  tun+=`<path d="M${a.x} ${a.y} L${b.x} ${b.y}" stroke="#4a3f63" stroke-width="16" stroke-linecap="round" fill="none"/>`;}
 const rooms=ROOMS1.map(r=>`<ellipse cx="${r.x}" cy="${r.y}" rx="${RX}" ry="${RY}" fill="#1d1730" stroke="#e8b14a" stroke-width="3"/>`).join("");
 const lab=ROOMS1.map(r=>`<text x="${r.x}" y="${r.y-13}" text-anchor="middle" font-family="var(--disp)" font-size="22" font-weight="700" fill="#e8b14a">${r.n}</text>`+
  `<text x="${r.x}" y="${r.y+8}" text-anchor="middle" font-family="var(--body)" font-size="14.5" font-weight="700" fill="#efe4d0">${r.t}</text>`+
  `<text x="${r.x}" y="${r.y+27}" text-anchor="middle" font-family="var(--body)" font-size="11" font-weight="600" fill="#a697bb">${r.s}</text>`).join("");
 return `<svg viewBox="0 0 640 340" role="img" aria-label="Map of the Old Copperfoot Mine: six rooms in a line">`+
  `<rect width="640" height="340" fill="#140f22"/>${tun}${rooms}${lab}`+
  `<path d="M92 14 L92 42" stroke="#a697bb" stroke-width="4" stroke-linecap="round"/>`+
  `<path d="M85 34 L92 44 L99 34" fill="none" stroke="#a697bb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`+
  `<text x="92" y="10" text-anchor="middle" font-family="var(--body)" font-size="11.5" font-weight="700" fill="#a697bb">daylight</text></svg>`;
})();
