const fs=require('fs');
let src=fs.readFileSync(__dirname+'/portrait-engine.js','utf8')
  .replace('function figure','global.figure=function figure')
  .replace('function icon','global.icon=function icon')
  .replace('function shade','global.shade=function shade')
  .replace('function mix','global.mix=function mix')
  .replace('function skullPath','global.skullPath=function skullPath').replace('function torsoPath','global.torsoPath=function torsoPath').replace('function irisArt','global.irisArt=function irisArt').replace('const RACES=','global.RACES=')
  .replace('let __uid=0;','global.__uid=0;');
eval(src);
src=fs.readFileSync(__dirname+'/barleybrook-adventure.js','utf8');
['HEROES','MONSTERS','TREASURE','MAGIC','MAPSVG'].forEach(k=>src=src.replace('const '+k+'=','global.'+k+'='));
let r=fs.readFileSync(__dirname+'/roster.js','utf8').replace('const ROSTER=','global.ROSTER=');
let dk=fs.readFileSync(__dirname+'/barleybrook-deck.js','utf8').replace('const DECK=','global.DECK=');
let c1=fs.readFileSync(__dirname+'/barleybrook-cast.js','utf8');
['CAST','ROOMS1','MAP1'].forEach(k=>c1=c1.replace('const '+k+'=','global.'+k+'='));
eval(src);
eval(r);
eval(c1);
eval(dk);

const circles=(n,extra)=>Array.from({length:n},()=>'<i></i>').join('')+
  (extra?Array.from({length:extra},()=>'<i class="ex"></i>').join(''):'');

const heroSheet=h=>`<div class="q hero">
 <div class="qtop">
  <div class="port">${figure(Object.assign({},h.art,{light:true}))}</div>
  <div class="who"><div class="nm">${h.name}</div><div class="ty">${h.cls} · ${h.pro}</div>
   <div class="blurb">${h.blurb}</div>
   <div class="stats"><span class="s"><em>AC</em><b>${h.ac}</b></span>
    <span class="s"><em>Hit</em><b>d20+${h.atk.b}</b></span>
    <span class="s alt"><em>no d20</em><b>${h.atk.alt}</b></span></div>
  </div>
 </div>
 <div class="hpline"><span class="hl">Hit points</span><span class="cc">${circles(h.hp,2)}</span>
  <span class="tiny">fill one per hit · rub out when healed · dotted ones are for levelling up</span></div>
 <div class="moves">
  <div class="mv"><span class="k atk">ATTACK</span><span><b>${h.atk.n}</b> — roll d20, add ${h.atk.b}, beat the monster's AC. <em>${h.atk.d}</em></span></div>
  <div class="mv"><span class="k sp">SPECIAL</span><span><b>${h.spec.n}</b> — <em>${h.spec.d}</em></span></div>
  <div class="mv"><span class="k gd">GOOD AT</span><span><b>${h.good.n}</b> — roll d20, add ${h.good.b}, beat 10.</span></div>
  <div class="mv"><span class="k cr">CRIT</span><span>Roll a natural <b>20</b> and you do <b>1d6</b> damage instead of 1.</span></div>
 </div>
 <div class="notes"><span class="hl">Things I found</span><span class="nl"></span><span class="nl"></span><span class="nl"></span></div>
 <div class="foot"><span>Gold <span class="line"></span></span><span>My title <span class="line long"></span></span></div>
</div>`;

const monsterCard=m=>`<div class="q mon">
 <div class="qtop">
  <div class="port">${figure(Object.assign({},m.art,{light:true}))}</div>
  <div class="who"><div class="nm">${m.name}</div><div class="ty">${m.role}</div>
   <div class="stats"><span class="s"><em>AC</em><b>${m.ac}</b></span>
    <span class="s"><em>Hit</em><b>d20+${m.atk.b}</b></span>
    <span class="s alt"><em>no d20</em><b>${m.atk.alt}</b></span></div></div>
 </div>
 <div class="hpline"><span class="hl">Hit points</span><span class="cc">${
   Array.from({length:m.hp},(_,j)=>(m.half&&j===m.half?'<span class="bar"></span>':'')+'<i></i>').join('')
 }</span>${m.half?'<span class="tiny">at the line, something changes</span>':''}</div>
 <div class="moves">
  <div class="mv"><span class="k atk">ATTACK</span><span><b>${m.atk.n}</b> — d20+${m.atk.b}. <em>${m.atk.d}</em></span></div>
  <div class="mv"><span class="k sp">SPECIAL</span><span><b>${m.spec.n}</b> — <em>${m.spec.d}</em></span></div>
 </div>
 <div class="tac"><b>Playing it:</b> ${m.note}</div>
</div>`;

const TIME={turn:'On your turn',free:'Free',always:'Always on'};
const RN={common:'Common',rare:'Rare',epic:'Legendary',relic:'Relic'};
const ARCH=`<svg class="arch" viewBox="0 0 100 100" preserveAspectRatio="none">
 <path d="M0 0 H100 V100 H0 Z M8 100 V40 Q8 12 50 12 Q92 12 92 40 V100 Z" fill="#ffffff" fill-rule="evenodd"/>
 <path d="M8 100 V40 Q8 12 50 12 Q92 12 92 40 V100" fill="none" stroke="#15101b" stroke-width="1.6" opacity=".8"/>
 <path d="M44 12 h12 v8 h-12 Z" fill="none" stroke="#15101b" stroke-width="1.4" opacity=".7"/>
 
 <g stroke="#15101b" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".55">
  <path d="M11 27 L3 17 M11 27 L21 21 M20 14 L14 5 M89 27 L97 17 M89 27 L79 21 M80 14 L86 5"/></g></svg>`;

const tCard=c=>`<div class="pc ${c.r}"><div class="pcin">
 <div class="part">${icon(c.i,c.c1,c.c2,true)}${ARCH}<div class="gem"></div><div class="ban"><h4>${c.n}</h4></div></div>
 <div class="ptxt"><p class="eff">${c.e}</p><p class="fl">${c.f}</p></div>
 <div class="rar"><span>${RN[c.r]}${c.k?' · '+c.k:''}</span><b class="tm tm-${c.t}">${TIME[c.t]}</b></div></div></div>`;

const castCard=m=>`<div class="pc cast ${m.t}"><div class="pcin">
 <div class="part sm">${figure(Object.assign({},m.art,{light:true}))}${ARCH}<div class="ban"><h4>${m.name}</h4></div></div>
 <div class="ptxt">
  <p class="role">${m.role}</p>
  <p class="st"><span>AC <b>${m.ac}</b></span><span>HP <b>${m.hp}</b></span>
   <span class="cc">${Array.from({length:m.hp},(_,j)=>(m.half&&j===m.half?'<i class="bar"></i>':'')+'<i></i>').join('')}</span></p>
  <p class="eff"><b>${m.atk.n}</b> d20+${m.atk.b} <span class="g">(${m.atk.alt})</span> — ${m.atk.d}</p>
  <p class="eff"><b>${m.spec.n}</b> — ${m.spec.d}</p></div>
 <div class="rar">${m.t==='boss'?'Boss':m.t==='elite'?'Elite':m.t==='ally'?'Friend':'Monster'}</div></div></div>`;


const handout=`<div class="q sign">
 <div class="signinner">
  <div class="snm">Tam's Sign</div>
  <p class="rhyme">Three bells hang in Copperfoot deep.<br>Ring them wrong and the rocks will weep.<br>
   First the <b>SMALL</b> one, bright and thin,<br>then the <b>CRACKED</b> one — let it ring,<br>
   then the <b>BIG</b> one, low and slow,<br>and the old stone door will go.</p>
  <div class="cut">Cut this out and hand it to them in room 1. Carrying the clue the whole way is most of the puzzle.</div>
 </div></div>`;

const rulesPage=`<div class="rulespage">
 <h2>The rules, in one minute</h2>
 <ul>
  <li><b>You say what your hero does.</b> If it's easy, it just happens — no dice.</li>
  <li><b>Hard or risky?</b> Roll the d20, add your number, beat <b>10</b>.</li>
  <li><b>Attacking:</b> d20 + your attack number against the monster's <b>AC</b>. Equal or higher hits, for <b>1 damage</b> — fill one circle.</li>
  <li><b>Natural 20</b> is a critical hit: roll a d6 for damage instead.</li>
  <li><b>Taking hits:</b> fill your own circles. All full and you fall asleep — <b>nobody dies.</b> You wake with 1 HP when the fight ends.</li>
  <li><b>Advantage:</b> roll two d20s, keep the better. <b>Disadvantage:</b> keep the worse. Give advantage for clever ideas.</li>
  <li><b>Turn order:</b> monsters first, then heroes in any order they like.</li>
  <li><b>Grown-up's rule:</b> monsters attack whoever has the <b>most</b> hit points, and never the same hero twice in a row.</li>
  <li><b>No d20?</b> Roll three six-sided dice and use the small grey number on each card instead.</li>
 </ul></div>`;

const hp=[];for(let i=0;i<ROSTER.length;i+=4)hp.push(ROSTER.slice(i,i+4).map(heroSheet));
const allCards=[...DECK.map(tCard),...CAST.map(castCard)];
const cardPages=[];for(let i=0;i<allCards.length;i+=9)cardPages.push(allCards.slice(i,i+9));
const html=`<!doctype html><html><head><meta charset="utf-8"><title>The Bell of Barleybrook — sheets</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@400;700&family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&display=swap">
<style>
:root{--panel:#fff;--panel2:#eef1f5;--ink:#1a2029;--muted:#5b6676;--line:#2a3340;
 --gold:#a8761b;--copper:#b4542c;--moss:#3d7350;--stone:#cfd6de;--cave:#eff2f6;
 --display:"Grenze Gotisch",serif;--body:"Crimson Pro",Georgia,serif}
@page{size:letter;margin:0.35in}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:var(--body);color:var(--ink);background:#fff;font-size:10pt}
.sheet{width:7.8in;height:10.3in;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;
 gap:0;page-break-after:always;break-after:page}
.sheet:last-child{page-break-after:auto;break-after:auto}
.page{width:7.9in;display:grid;grid-template-columns:repeat(3,2.5in);grid-auto-rows:3.4in;
 page-break-after:always;break-after:page}
/* ---- cards on white, ink line, colour only where it earns it ---- */
.pc{padding:0;position:relative;background:#fff;border:1.4pt solid #15101b}
.pc.common{--gl:#5d6e46}.pc.rare{--gl:#2f5f93}.pc.epic{--gl:#9a6a12}.pc.relic{--gl:#9a3a18}
.pc.cast{--gl:#9a3a18}.pc.cast.ally{--gl:#2f6b52}.pc.cast.boss{--gl:#8a2436}.pc.cast.elite{--gl:#9a6a12}
.pcin{background:#fff;height:100%;display:flex;flex-direction:column;overflow:hidden;color:#15101b}
.part{position:relative;border-bottom:1.2pt solid #15101b}
.part>svg{display:block;width:100%;height:auto}
.part.sm>svg{height:104pt;object-fit:cover}
.arch{position:absolute;inset:0;width:100%;height:100%}
.gem{position:absolute;top:4pt;left:4pt;width:12pt;height:12pt;transform:rotate(45deg);
 background:var(--gl);border:1.2pt solid #15101b}
.ban{position:absolute;left:0;right:0;bottom:0;padding:3.6pt 7pt 3pt;background:#fff;border-top:1.2pt solid #15101b}
.ban h4{margin:0;font-family:var(--disp);font-size:9.4pt;line-height:1.1;color:#15101b}
.ptxt{padding:5pt 7pt 4pt;display:flex;flex-direction:column;gap:3pt;flex:1;background:#fff}
.eff{margin:0;font-size:7.2pt;line-height:1.3}
.fl{margin:0;font-size:6.2pt;font-style:italic;color:#5b5266;line-height:1.26}
.role{margin:0;font-size:6.6pt;font-style:italic;color:#5b5266}
.st{margin:0;display:flex;gap:7pt;align-items:center;font-size:7.4pt;flex-wrap:wrap}
.st b{font-family:var(--disp);font-size:9pt}
.cc{display:flex;gap:2pt;align-items:center;flex-wrap:wrap}
.cc i{width:7pt;height:7pt;border:1pt solid #15101b;border-radius:50%;display:block}
.cc i.bar{width:1.4pt;height:7pt;background:#9a6a12;border:0}
.g{color:#5b5266}
.rar{font-family:var(--disp);font-size:6pt;letter-spacing:.13em;text-transform:uppercase;
 padding:2.6pt 7pt 3.4pt;color:var(--gl);border-top:1pt solid #15101b;background:#fff;font-weight:700;
 display:flex;justify-content:space-between;align-items:baseline;gap:5pt}
.tm{letter-spacing:.06em;white-space:nowrap}
.tm-turn{color:#b4542c}.tm-free{color:#2f6b52}.tm-always{color:#2f5f93}
.q{border:0.8pt dashed var(--line);padding:11pt 12pt;display:flex;flex-direction:column;gap:5pt;overflow:hidden}
.qtop{display:grid;grid-template-columns:62pt 1fr;gap:9pt;align-items:start}
.port svg{width:62pt;height:62pt;border:1pt solid var(--line);border-radius:2pt;display:block}
.nm{font-family:var(--display);font-size:17pt;line-height:1}
.mon .nm{color:var(--copper)}
.ty{font-style:italic;color:var(--muted);font-size:8.6pt;margin-top:1pt}
.blurb{font-size:8.6pt;line-height:1.25;margin-top:2pt}
.stats{display:flex;gap:9pt;margin-top:4pt;flex-wrap:wrap}
.s{border:1pt solid var(--line);border-radius:2pt;padding:1.5pt 5pt;text-align:center;min-width:34pt}
.s em{display:block;font-style:normal;font-size:5.8pt;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.s b{font-family:var(--display);font-size:13pt;line-height:1}
.s.alt b{font-size:10pt;color:var(--muted)}
.hpline{display:flex;align-items:center;gap:5pt;flex-wrap:wrap;border-top:1pt solid var(--line);
 border-bottom:1pt solid var(--line);padding:4pt 0}
.hl{font-size:6.4pt;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:700}
.cc{display:flex;gap:3pt;align-items:center;flex-wrap:wrap}
.cc i{width:11pt;height:11pt;border:1.2pt solid var(--line);border-radius:50%;display:block}
.cc i.ex{border-style:dotted;opacity:.55}
.cc .bar{width:1.6pt;height:11pt;background:var(--copper)}
.tiny{font-size:6.2pt;color:var(--muted);font-style:italic}
.moves{display:grid;gap:4.5pt}
.mv{display:grid;grid-template-columns:auto 1fr;gap:6pt;align-items:start;font-size:8.6pt;line-height:1.3}
.k{font-family:var(--display);font-size:6.4pt;letter-spacing:.06em;padding:1.6pt 4pt;border-radius:2pt;
 color:#fff;white-space:nowrap;margin-top:.8pt}
.k.atk{background:var(--copper)}.k.sp{background:var(--moss)}.k.gd{background:var(--gold)}
.k.cr{background:var(--line)}
.mv em{font-style:italic;color:var(--muted)}
.tac{margin-top:auto;border-top:1pt solid var(--line);padding-top:4pt;font-size:7.6pt;line-height:1.3;color:var(--muted)}
.tac b{color:var(--ink);font-family:var(--display);font-size:8.4pt}
.notes{margin-top:auto;display:grid;gap:7pt;padding-top:6pt}
.notes .nl{border-bottom:0.8pt solid var(--line);opacity:.5;height:1pt}
.foot{display:flex;gap:14pt;font-size:8pt;align-items:baseline;padding-top:4pt;border-top:1pt solid var(--line)}
.line{display:inline-block;width:44pt;border-bottom:1pt solid var(--line)}
.line.long{width:96pt}
.sign{align-items:center;justify-content:center}
.signinner{border:2.5pt double var(--copper);padding:14pt;text-align:center;width:100%}
.snm{font-family:var(--display);font-size:19pt;color:var(--copper)}
.rhyme{font-size:11pt;line-height:1.6;margin:8pt 0}
.cut{font-size:7pt;font-style:italic;color:var(--muted);line-height:1.3}
.mappage{width:7.8in;height:10.3in;display:grid;grid-template-rows:auto auto auto 1fr;gap:10pt;align-content:start}
.mappage h1{font-family:var(--display);font-size:26pt;margin:0;text-align:center}
.mappage .sub{text-align:center;font-style:italic;color:var(--muted);font-size:9.5pt;margin-top:-4pt}
.mapbox{border:1.2pt solid var(--line);background:#fff;display:grid;place-items:center;overflow:hidden}
.mapbox svg>rect{fill:#fff}
.dmnotes{border:1.2pt solid var(--line);padding:9pt 12pt}
.dmnotes h2{font-family:var(--display);font-size:13pt;margin:0 0 6pt}
.dmnotes .nl{border-bottom:0.8pt solid var(--line);opacity:.45;height:14pt}
.mapbox svg{width:100%;height:auto;display:block}
.rulespage{border:1.2pt solid var(--line);padding:11pt 14pt}
.rulespage h2{font-family:var(--display);font-size:15pt;margin:0 0 5pt}
.rulespage ul{margin:0;padding-left:13pt;columns:2;column-gap:16pt;font-size:8.4pt;line-height:1.32}
.rulespage li{margin-bottom:3.4pt;break-inside:avoid}
</style></head><body>
${hp.map(p=>`<div class="sheet">${p.join('')}</div>`).join('')}
${cardPages.map(p=>`<div class="page">${p.join('')}</div>`).join('')}
<div class="sheet">${handout}</div>
<div class="mappage">
 <div><h1>The Old Copperfoot Mine</h1><p class="sub">Six rooms in a line. Nobody can get lost.</p></div>
 <div class="mapbox">${MAP1}</div>
 ${rulesPage}
 <div class="dmnotes"><h2>What happened (fill in after)</h2><div class="nl"></div><div class="nl"></div><div class="nl"></div><div class="nl"></div></div>
</div>
</body></html>`;
fs.writeFileSync(__dirname+'/print-barleybrook.html',html);
console.log('card pages:',cardPages.length,'| treasure:',DECK.length,'| cast:',CAST.length,'| hero pages:',hp.length,'| handout + map: 2');
