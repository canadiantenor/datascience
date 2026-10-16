/* ===== adventure one's own treasure deck — village, mine and festival =====
   23 cards: 9 common, 7 rare, 3 legendary, 4 relic. With the 4 cast cards
   that is exactly 27, which fills three Letter pages at 9 to a page. */
const DECK=[
 {n:"Harvest Apple",r:"common",t:"turn",i:"food",c1:"#d9484a",c2:"#6b2420",e:"Eat it on your turn and rub out <b>2</b> filled circles.",f:"From the top of the tree, which is the best place and the hardest to reach."},
 {n:"The Goblin's Teapot",r:"common",t:"always",i:"crown",c1:"#c9a24a",c2:"#6b4a18",e:"Wear it as a helmet. <b>+1 AC</b> for the rest of the adventure.",f:"Still slightly warm. Do not think about why."},
 {n:"Tam's Spare Whistle",r:"common",t:"turn",i:"bell",c1:"#cfd6e0",c2:"#5a6270",e:"Blow it. Every goblin who can hear it runs away for one whole turn.",f:"“I have a spare. Obviously I have a spare.”"},
 {n:"Pocket of Chalk",r:"common",t:"free",i:"pouch",c1:"#e0dccf",c2:"#6b665c",e:"Mark any wall and you can always find the way back. Once, draw a door and it opens.",f:"Three stubs and a lot of dust."},
 {n:"Miner's Candle Stub",r:"common",t:"free",i:"coal",c1:"#ffc96a",c2:"#8a4a18",e:"Light any dark place. Once, the flame leans toward the nearest hidden thing.",f:"Burned by somebody who got out."},
 {n:"The Bent Copper Penny",r:"common",t:"free",i:"gem",c1:"#c9803a",c2:"#6b3414",e:"Flip it to roll any one die again. You must keep the second roll.",f:"Bent by a bell, a hundred years ago."},
 {n:"Jar of Beetles",r:"common",t:"turn",i:"lantern",c1:"#7ab86a",c2:"#2f5c2a",e:"Open it next to a monster. It is far too disgusted to attack next turn.",f:"Nine of them. There were ten."},
 {n:"Woolly Scarf",r:"common",t:"always",i:"shield",c1:"#d98aa8",c2:"#6b2f4a",e:"The first cold, wet or windy thing that happens to you does <b>nothing at all</b>.",f:"Knitted long. Knitted with love. Knitted far too long."},
 {n:"Half a Sandwich",r:"common",t:"turn",i:"food",c1:"#d9bc84",c2:"#6b5024",e:"Give it to anything hungry. It stops being a problem and starts being a friend.",f:"The other half is gone and nobody is admitting anything."},

 {n:"Bell-Ringer's Gloves",r:"rare",t:"always",i:"boots",c1:"#a8763a",c2:"#4a2e14",e:"Climb anything, and you can never be made to drop what you are holding.",f:"Worn by whoever rings the Harvest Bell. The rope is not gentle."},
 {n:"The Barrel Lid",r:"rare",t:"free",i:"shield",c1:"#b07a4a",c2:"#4a2e18",e:"Once per fight: an attack aimed at anyone beside you hits the lid instead.",f:"It was a pickle barrel. It is a shield now. It is still a bit of a pickle barrel."},
 {n:"Hob's Fishing Rod",r:"rare",t:"turn",i:"hammer",c1:"#9a8a5a",c2:"#4a4024",e:"Hook one object — or one small friend — and pull it across the room to you.",f:"Has caught two fish and one mayor."},
 {n:"Mine Cart Wheel",r:"rare",t:"turn",i:"gem",c1:"#8a9099",c2:"#3d434a",e:"Roll it down the tunnel: <b>3 damage</b> to everything in a straight line. Once.",f:"Heavier than you. That is the point of it."},
 {n:"Lantern of the Lost Miner",r:"rare",t:"free",i:"lantern",c1:"#ffd97a",c2:"#8a5a18",e:"Once per adventure, hold it to a wall and see straight through it.",f:"He found his way out eventually. He left this behind on purpose."},
 {n:"Festival Firework",r:"rare",t:"turn",i:"star",c1:"#e0603a",c2:"#6b2010",e:"Bang, and a great deal of light. <b>Every</b> monster loses its next turn. Once.",f:"Saved since last autumn, in a drawer, by somebody sensible."},
 {n:"Juniper's Cough Drop",r:"rare",t:"free",i:"gem",c1:"#8fd96a",c2:"#2f5c2a",e:"Cures anything, once: poison, webs, sleep, sneezing, or being slightly on fire.",f:"Tastes of aniseed and regret."},

 {n:"The Bell's Own Clapper",r:"epic",t:"turn",i:"bell",c1:"#f0c85a",c2:"#8a5a18",e:"Ring it once per adventure: every friend heals <b>completely</b>, every monster takes <b>1</b>.",f:"It rang over three valleys for a hundred years. It remembers how."},
 {n:"The Copperfoot Key",r:"epic",t:"free",i:"key",c1:"#d9a441",c2:"#7a4a14",e:"Opens one locked thing anywhere, with no roll. A door that wasn't locked becomes unlocked, which is worse.",f:"Nobody knows which door it was cut for. It does."},
 {n:"The Last Firework",r:"epic",t:"free",i:"star",c1:"#ffd16a",c2:"#8a5a14",e:"Once, ever: you <b>cannot lose this fight</b>. Describe exactly how you win.",f:"There is only one. There was only ever going to be one."},

 {n:"Tam's Thank-You Ribbon",r:"relic",t:"free",i:"feather",c1:"#6fa8e0",c2:"#28456e",e:"Once per adventure, say his name and Tam turns up, with a lantern and an opinion.",f:"Mouse-sized. Tied by mouse hands. Keep it.",k:"keep forever"},
 {n:"Dragon-Song Tuning Fork",r:"relic",t:"turn",i:"bell",c1:"#cfd6e0",c2:"#5a6270",e:"Once per adventure, strike it and <b>any</b> creature must stop and listen to you for a whole turn.",f:"Clink had it first. He wants you to have it.",k:"keep forever"},
 {n:"The Village's Thanks",r:"relic",t:"always",i:"crown",c1:"#e0a24a",c2:"#8a4a22",e:"<b>+1 hit point</b> forever, and you never go hungry in any village, anywhere.",f:"Not a thing you carry. A thing people remember.",k:"keep forever"},
 {n:"Mine Lizard Whistle",r:"relic",t:"turn",i:"tooth",c1:"#6f9ba8",c2:"#2f4a54",e:"Once per adventure, blow it and Chompy arrives and sits on <b>one</b> thing of your choice.",f:"He is not fast. He is, however, extremely heavy.",k:"keep forever"}
];
