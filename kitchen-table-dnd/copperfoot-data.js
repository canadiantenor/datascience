/* ===== treasure deck ===== */
const DECK=[
 {n:"Honey Bun",r:"common",i:"food",c1:"#e0a24a",c2:"#8a4a22",e:"Eat it on your turn. Rub out <b>2</b> filled circles.",f:"Still warm. Nobody will say whose it was."},
 {n:"Bottled Firefly",r:"common",i:"lantern",c1:"#8fd96a",c2:"#2f5c2a",e:"Point her at one monster. It is dazzled and its next attack <b>misses</b>.",f:"She blinks when you blink."},
 {n:"Pocket of Shiny Pebbles",r:"common",i:"pouch",c1:"#9fb4c9",c2:"#3d4e63",e:"Throw one for <b>1 damage</b> from anywhere in the room. Three pebbles.",f:"Every one of them picked up off a different floor."},
 {n:"Lucky Button",r:"common",i:"gem",c1:"#5fc9b4",c2:"#1f5c52",e:"Roll any one die again. You must keep the second roll.",f:"Off a coat that went somewhere very brave."},
 {n:"Grandmother's Scarf",r:"common",i:"shield",c1:"#d98aa8",c2:"#6b2f4a",e:"The first hit you take in a fight does <b>nothing at all</b>.",f:"Three times too long for you. That is on purpose."},
 {n:"Snap-Trap in a Tin",r:"common",i:"tooth",c1:"#b6bcc4",c2:"#4a5058",e:"Set it on the floor. The next monster to come close takes <b>2 damage</b>.",f:"Do not open it indoors. Or do."},
 {n:"Sugar Mouse",r:"common",i:"food",c1:"#f0a8c0",c2:"#8a3a5c",e:"Give it to any animal. That animal is your friend for the rest of the scene.",f:"It is the exact size of a very good idea."},
 {n:"Climbing Rope",r:"common",i:"pouch",c1:"#c9a06a",c2:"#5c3a1e",e:"Get anywhere high, or anybody out of anywhere deep. No roll needed.",f:"Knotted every foot by somebody careful."},
 {n:"Bag of Marbles",r:"common",i:"pouch",c1:"#6fb0d9",c2:"#27456b",e:"Throw it. Every monster close to you falls over and loses its next attack.",f:"Glass, mostly. One is an eye. Don't ask."},
 {n:"Copper Whistle",r:"common",i:"bell",c1:"#d9924a",c2:"#7a3f18",e:"One monster must attack <b>you</b> instead of whoever it was going for.",f:"Shaped like a very annoyed bird."},
 {n:"Soldier's Biscuit",r:"common",i:"food",c1:"#d9bc84",c2:"#6b5024",e:"Rub out <b>1</b> circle. If you were knocked out, stand straight up instead.",f:"Older than you. Harder than the floor."},
 {n:"Candle of Small Courage",r:"common",i:"coal",c1:"#ffc96a",c2:"#8a4a18",e:"Light it for a friend. Every roll they make this fight has <b>advantage</b>.",f:"Burns down a little every time somebody is brave."},

 {n:"Thimble of Courage",r:"rare",i:"gem",c1:"#6fa8e0",c2:"#28456e",e:"For one whole fight, roll <b>every</b> die twice and keep the better one.",f:"Much too small to wear. Wear it anyway."},
 {n:"The Singing Spoon",r:"rare",i:"bell",c1:"#cfd6e0",c2:"#5a6270",e:"Hum into it. One monster sits down and listens for a full turn.",f:"It only knows the one tune, and the tune is not very good."},
 {n:"Boots of the Thunder Step",r:"rare",i:"boots",c1:"#9a7ad9",c2:"#3a2a6b",e:"Once a fight: appear anywhere you can see, and your next hit does <b>+2</b>.",f:"The thunder arrives slightly after you do."},
 {n:"The Glass Amulet",r:"rare",i:"amulet",c1:"#6fe0d9",c2:"#1f5c6b",e:"When a friend is knocked out, they stand up at once with <b>2</b> hit points. Once.",f:"It hums when somebody you love is frightened."},
 {n:"Mirror Shard",r:"rare",i:"mirror",c1:"#c9dcea",c2:"#4a5f73",e:"One attack aimed at you hits the <b>monster</b> instead. Once.",f:"Hold it up. Whatever is coming has to look at itself first."},
 {n:"Ironbark Shield",r:"rare",i:"shield",c1:"#8fa86a",c2:"#3d4a24",e:"For one fight: nothing can knock you over, and attacks against you are at <b>disadvantage</b>.",f:"Grown, not forged. It still has one leaf."},
 {n:"The Patient Hammer",r:"rare",i:"hammer",c1:"#b6bcc4",c2:"#3d434a",e:"Spend a whole turn lifting it. On your next turn it hits for <b>4</b>.",f:"It is in no hurry whatsoever."},
 {n:"Feather of the High Wind",r:"rare",i:"feather",c1:"#d9e8f5",c2:"#4a6b8a",e:"The whole party floats anywhere you point. Once.",f:"Dropped by something enormous that did not notice."},

 {n:"The Everburning Coal",r:"epic",i:"coal",c1:"#ffb43c",c2:"#8a2f10",e:"Once per adventure: a column of gold fire. <b>5 damage</b> to one monster.",f:"It has been burning since before the mountain. It is not tired."},
 {n:"The Second Chance",r:"epic",i:"star",c1:"#ffe9a8",c2:"#8a7024",e:"The first time the <b>whole party</b> is knocked out, everybody stands up with <b>full hearts</b>.",f:"You only ever find one of these."},
 {n:"Crown of Small Kings",r:"epic",i:"crown",c1:"#ffd16a",c2:"#8a5a14",e:"Once per fight: take <b>two turns in a row</b>.",f:"Fits a mouse, a dragon or a seven-year-old. Never a tyrant."},
 {n:"The Wishing Bell",r:"epic",i:"bell",c1:"#f0c85a",c2:"#8a5a18",e:"Say one wish out loud. The Dungeon Master has to say <b>yes</b>. Once per adventure.",f:"Ring it only when it truly matters. It is listening."},

 {n:"The Sharpened Tooth",r:"relic",i:"tooth",c1:"#e8dcc0",c2:"#7a6a4a",e:"<b>+1</b> to every attack roll you make, in every adventure, forever.",f:"It was given, not taken. That matters to it.",k:"keep forever"},
 {n:"Dragon-Scale Charm",r:"relic",i:"shield",c1:"#d9924a",c2:"#6b3414",e:"<b>+1 AC</b>, forever. Write the new number on your sheet.",f:"Warm, always, even in the deep.",k:"keep forever"},
 {n:"Tam's Second Lantern",r:"relic",i:"lantern",c1:"#ffd97a",c2:"#8a5a18",e:"You can see in <b>any</b> darkness, in every adventure from now on.",f:"\"I had a spare. Obviously I had a spare.\"",k:"keep forever"},
 {n:"The Map That Draws Itself",r:"relic",i:"scroll",c1:"#e0cfa8",c2:"#6b5a34",e:"Before you walk into a room, the Dungeon Master tells you <b>one true thing</b> about it.",f:"It is drawing you right now. Look.",k:"keep forever"},
 {n:"Hero's Knot",r:"relic",i:"gem",c1:"#e07a6a",c2:"#6b2418",e:"Once per adventure, rub out <b>3</b> filled circles on any sheet.",f:"Tied by somebody who came back.",k:"keep forever"},
 {n:"Verdigris's Scale",r:"relic",i:"amulet",c1:"#5fd9b4",c2:"#1f6b5c",e:"Once per adventure, call a <b>dragon</b>. She helps for one turn, then goes.",f:"Given, in the deep, by a mother who was wrong and said so.",k:"boss relic"}
];

/* ===== cast ===== */
const CAST=[
 {t:"ally",name:"Clink",role:"Your friend. One player runs him.",ac:12,hp:5,
  atk:{n:"Baby Flame",b:3,alt:"3d6",d:"1 point of fire damage. Smells of warm pennies."},
  spec:{n:"Sing",d:"Once per fight: one monster has to stop and listen for a whole turn. He is still embarrassed about it."},
  note:"He has been practising every day since the Harvest Festival. He is not good yet. He is getting better.",
  art:{name:"Clink",turn:0.26,tilt:-3,race:"dragonborn",skin:"#d98a47",suit:"#8a4a22",iris:"#6fd0a8",rim:"#ffc98a",mouth:"open",brow:"sad",bgA:"#8a4ab0",bgB:"#1e0f2e",horn:"#e6dcc2"}},
 {t:"ally",name:"Tam the Lantern Mouse",role:"Hints, lantern, moral support.",ac:13,hp:3,
  atk:{n:"Tiny Rapier",b:4,alt:"3d6+1",d:"1 point of extremely indignant damage."},
  spec:{n:"I Know A Way",d:"Once per adventure, Tam finds a small door. The party skips any one obstacle."},
  note:"Give him to the grown-up. He is how you hand out hints without taking over.",
  art:{name:"Tam",turn:-0.28,tilt:3,race:"mouse",skin:"#c9a06a",suit:"#4a6b8a",iris:"#3f7a4e",rim:"#ffdca8",mouth:"smile",brow:"calm",bgA:"#4a6bc9",bgB:"#0f1430"}},
 {t:"foe",name:"Tick-Tock Beetles",role:"Three of them. Clockwork, not alive.",ac:11,hp:2,
  atk:{n:"Pincer Snip",b:3,alt:"3d6",d:"1 point of pinching damage."},
  spec:{n:"Wind Up",d:"Each time one beetle stops, the others tick faster: <b>+1</b> to their attack rolls."},
  note:"They are machines, so nobody has to feel bad. A hero who grabs the big brass key on a beetle's back and turns it <b>backwards</b> stops that beetle with no roll at all.",
  art:{name:"Beetle",turn:0.2,tilt:-2,race:"beetle",skin:"#b07a2e",suit:"#5c3a14",iris:"#ff8a3c",rim:"#ffb45c",mouth:"fang",brow:"angry",bgA:"#b06a2e",bgB:"#2a1208"}},
 {t:"foe",name:"The Ember Kettle",role:"A stove that got opinions.",ac:11,hp:5,
  atk:{n:"Hot Coal Spit",b:3,alt:"3d6",d:"1 point of ouch-hot damage."},
  spec:{n:"Boil Over",d:"Once per fight: every hero standing close takes 1 damage and is covered in soup."},
  note:"The water jug is on the shelf, in plain sight, and you should mention it twice. Pouring it on the Kettle wins the fight instantly and that is allowed.",
  art:{name:"Kettle",turn:-0.15,tilt:2,race:"construct",skin:"#c47a3a",suit:"#5c2f14",iris:"#ffb43c",rim:"#ff9a4a",mouth:"fang",brow:"angry",bgA:"#c4542e",bgB:"#2c0c0c"}},
 {t:"elite",name:"The Bronze Warden",role:"Elite. It is guarding a door, and it is good at it.",ac:14,hp:8,half:4,
  atk:{n:"Great Fist",b:5,alt:"3d6+2",d:"1 damage, and that hero is knocked over."},
  spec:{n:"Slow and Certain",d:"The Warden attacks only every <b>other</b> round — but when it does, it hits <b>two</b> heroes."},
  note:"It is not cruel, it is employed. If a hero says Verdigris's name out loud, or shows it Clink's drawing, it steps aside — no fight, and the party takes a Rare instead of a Legendary. Let them choose with their eyes open.",
  art:{name:"Warden",turn:0.14,tilt:-1.5,race:"construct",skin:"#a8873f",suit:"#4a3a1e",iris:"#7ad9e0",rim:"#ffd97a",mouth:"flat",brow:"angry",bgA:"#8a7a3a",bgB:"#1f1a0c"}},
 {t:"boss",name:"Verdigris, the Copper Mother",role:"Boss. Wingspan the width of the cave.",ac:14,hp:14,half:7,
  atk:{n:"Verdigris Breath",b:5,alt:"3d6+2",d:"1 damage to <b>two</b> heroes, and their ears ring: their next attack is rolled twice, keeping the worse."},
  spec:{n:"Mother's Roar",d:"Once: everybody has to spend their whole turn holding on to something. No attacks that round."},
  note:"At <b>7</b> filled circles she stops to breathe, and that is your opening — she can hear something. The adventure is won the moment Clink sings, whether she has 14 circles left or 1. She has never heard him. She did not know he could.",
  art:{name:"Verdigris",turn:-0.2,tilt:2,race:"dragonborn",skin:"#4fa88a",suit:"#1f5c52",iris:"#f0c044",rim:"#8ff0d0",mouth:"fang",brow:"angry",bgA:"#2e8a8a",bgB:"#061c22",horn:"#e6dcc2"}}
];

/* ===== the node map ===== */
const NODES=[
 {id:'start',x:210,y:486,k:'start',t:"The Mine Gate"},
 {id:'gallery',x:112,y:378,k:'fight',t:"Rattling Gallery"},
 {id:'kitchen',x:308,y:378,k:'fight',t:"Ember Kitchen"},
 {id:'keys',x:210,y:270,k:'puzzle',t:"Hall of Keys"},
 {id:'warden',x:112,y:162,k:'elite',t:"The Bronze Warden"},
 {id:'mouse',x:308,y:162,k:'rest',t:"The Mouse Door"},
 {id:'boss',x:210,y:56,k:'boss',t:"The Singing Deep"}
];
const EDGES=[['start','gallery'],['start','kitchen'],['gallery','keys'],['kitchen','keys'],
 ['keys','warden'],['keys','mouse'],['warden','boss'],['mouse','boss']];
const NK={
 start:{c:'#9fb27e',l:'Start'},fight:{c:'#e07a5a',l:'Fight'},puzzle:{c:'#7fb2e8',l:'Puzzle + Chest'},
 elite:{c:'#d9a441',l:'Elite'},rest:{c:'#8fd9b4',l:'Safe path'},boss:{c:'#ef6a7a',l:'Boss'}};
function nodeGlyph(k,c){
 const G={
  start:`<path d="M-7 5 L0 -7 L7 5 Z" fill="${c}"/>`,
  fight:`<path d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>`,
  puzzle:`<rect x="-8" y="-6" width="16" height="12" rx="2" fill="none" stroke="${c}" stroke-width="3"/>
          <path d="M-8 -1 L8 -1" stroke="${c}" stroke-width="3"/>`,
  elite:`<circle cx="0" cy="-1" r="6.5" fill="none" stroke="${c}" stroke-width="3"/>
         <path d="M-3 7 L3 7" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`,
  rest:`<path d="M0 7 C-9 0 -7 -8 0 -7 C7 -8 9 0 0 7 Z" fill="${c}"/>`,
  boss:`<path d="M-9 4 L-4 -6 L0 0 L4 -6 L9 4 Z" fill="${c}"/>`};
 return G[k]||'';
}
const MAPSVG2=(()=>{
 const byId={};NODES.forEach(n=>byId[n.id]=n);
 let e=EDGES.map(([a,b])=>{const A=byId[a],B=byId[b];
  return `<path d="M${A.x} ${A.y} C${A.x} ${(A.y+B.y)/2} ${B.x} ${(A.y+B.y)/2} ${B.x} ${B.y}"
   fill="none" stroke="#4a3f63" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="round"/>`}).join('');
 let n=NODES.map(d=>{const k=NK[d.k];
  return `<g transform="translate(${d.x} ${d.y})">
   <circle r="25" fill="#1d1730" stroke="${k.c}" stroke-width="3"/>
   <circle r="25" fill="none" stroke="${k.c}" stroke-width="9" opacity=".16"/>
   ${nodeGlyph(d.k,k.c)}
   <text y="42" text-anchor="middle" font-family="var(--disp)" font-size="14" fill="#efe4d0">${d.t}</text>
   <text y="57" text-anchor="middle" font-family="var(--body)" font-size="11" fill="${k.c}">${k.l}</text>
  </g>`}).join('');
 return `<svg viewBox="0 0 420 540" role="img" aria-label="Branching map: two routes up, then a choice of elite or safe path, then the boss">
  <rect width="420" height="540" fill="#140f22"/>${e}${n}</svg>`;
})();
