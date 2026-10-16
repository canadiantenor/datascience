const fs=require('fs');
function load(f,names){let s=fs.readFileSync(__dirname+'/'+f,'utf8');
 names.forEach(n=>s=s.replace('const '+n+'=','global.'+n+'='));
 return s;}
let art=fs.readFileSync(__dirname+'/portrait-engine.js','utf8')
 .replace('function creature','global.creature=function creature')
 .replace('function figure','global.figure=function figure')
 .replace('function icon','global.icon=function icon')
 .replace('function shade','global.shade=function shade')
 .replace('function mix','global.mix=function mix')
 .replace('function skullPath','global.skullPath=function skullPath').replace('function torsoPath','global.torsoPath=function torsoPath').replace('function irisArt','global.irisArt=function irisArt').replace('const RACES=','global.RACES=')
 .replace('let __uid=0;','global.__uid=0;');
eval(art);
eval(load('copperfoot-data.js',['DECK','CAST','NODES','EDGES','NK','MAPSVG2']).replace('function nodeGlyph','global.nodeGlyph=function nodeGlyph'));
eval(load('roster.js',['ROSTER']));

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
 <div class="rar">${RN[c.r]}${c.k?' · '+c.k:''}</div></div></div>`;

const castCard=m=>`<div class="pc cast ${m.t}"><div class="pcin">
 <div class="part sm">${figure(Object.assign({},m.art,{light:true}))}${ARCH}<div class="ban"><h4>${m.name}</h4></div></div>
 <div class="ptxt">
  <p class="role">${m.role}</p>
  <p class="st"><span>AC <b>${m.ac}</b></span><span>HP <b>${m.hp}</b></span>
   <span class="cc">${Array.from({length:m.hp},(_,j)=>(m.half&&j===m.half?'<i class="bar"></i>':'')+'<i></i>').join('')}</span></p>
  <p class="eff"><b>${m.atk.n}</b> d20+${m.atk.b} <span class="g">(${m.atk.alt})</span> — ${m.atk.d}</p>
  <p class="eff"><b>${m.spec.n}</b> — ${m.spec.d}</p></div>
 <div class="rar">${m.t==='boss'?'Boss':m.t==='elite'?'Elite':m.t==='ally'?'Friend':'Monster'}</div></div></div>`;

const heroSheet=h=>`<div class="q">
 <div class="qt"><div class="qp">${figure(Object.assign({},h.art,{light:true}))}</div>
  <div><div class="qn">${h.name}</div><div class="qc">${h.cls} · <em>${h.pro}</em></div>
   <div class="qb">${h.blurb}</div>
   <div class="qs"><span><em>AC</em><b>${h.ac}</b></span><span><em>Hit</em><b>d20+${h.atk.b}</b></span>
    <span class="alt"><em>no d20</em><b>${h.atk.alt}</b></span></div></div></div>
 <div class="qhp"><span class="hl">Hit points</span><span class="cc">${
   Array.from({length:h.hp},()=>'<i></i>').join('')+'<i class="ex"></i><i class="ex"></i>'}</span>
   <span class="tiny">dotted = room to level up</span></div>
 <div class="qm">
  <div class="m"><span class="k a">ATTACK</span><span><b>${h.atk.n}</b> — ${h.atk.d}</span></div>
  <div class="m"><span class="k s">SPECIAL</span><span><b>${h.spec.n}</b> — ${h.spec.d}</span></div>
  <div class="m"><span class="k g">GOOD AT</span><span><b>${h.good.n}</b> — d20+${h.good.b}, beat 10.</span></div>
  <div class="m"><span class="k c">CRIT</span><span>Natural <b>20</b> does <b>1d6</b> damage instead of 1.</span></div></div>
 <div class="qrel"><span class="hl">Relics (keep forever)</span><span class="nl"></span><span class="nl"></span></div>
 <div class="qf"><span>Gold <span class="ln"></span></span><span>Title <span class="ln lg"></span></span></div>
</div>`;

const cards=[...DECK.map(tCard),...CAST.map(castCard)];
const cpages=[];for(let i=0;i<cards.length;i+=9)cpages.push(cards.slice(i,i+9));
const hpages=[];for(let i=0;i<ROSTER.length;i+=4)hpages.push(ROSTER.slice(i,i+4).map(heroSheet));

const html=`<!doctype html><html><head><meta charset="utf-8"><title>Copperfoot print pack</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Spectral:ital,wght@0,400;0,600;0,700;1,400&display=swap">
<style>
:root{--disp:"Cinzel",serif;--body:"Spectral",Georgia,serif;--ink:#1a1420;--dim:#5b5266;--edge:#2a2335}
@page{size:letter;margin:0.3in}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:var(--body);background:#fff;color:var(--ink)}
.page{width:7.9in;display:grid;grid-template-columns:repeat(3,2.5in);grid-auto-rows:3.4in;
 page-break-after:always;break-after:page}
.sheetpage{width:7.9in;height:10.3in;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;
 page-break-after:always;break-after:page}
.sheetpage:last-child,.page:last-child{page-break-after:auto;break-after:auto}
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
 padding:2.6pt 7pt 3.4pt;color:var(--gl);border-top:1pt solid #15101b;background:#fff;font-weight:700}
/* ---- light hero sheets ---- */
.q{border:0.8pt dashed #2a2335;padding:10pt 11pt;display:flex;flex-direction:column;gap:5pt}
.qt{display:grid;grid-template-columns:62pt 1fr;gap:9pt;align-items:start}
.qp svg{width:62pt;height:73pt;border:1pt solid #2a2335;border-radius:2pt;display:block}
.qn{font-family:var(--disp);font-size:14.5pt;line-height:1.02}
.qc{font-size:8.2pt;color:var(--dim)}.qc em{font-style:normal;color:#8a5a18;font-weight:600}
.qb{font-size:8.4pt;line-height:1.25;margin-top:2pt}
.qs{display:flex;gap:7pt;margin-top:4pt;flex-wrap:wrap}
.qs span{border:1pt solid #2a2335;border-radius:2pt;padding:1.4pt 5pt;text-align:center;min-width:32pt}
.qs em{display:block;font-style:normal;font-size:5.6pt;letter-spacing:.1em;text-transform:uppercase;color:var(--dim)}
.qs b{font-family:var(--disp);font-size:11.5pt;line-height:1}
.qs .alt b{font-size:9pt;color:var(--dim)}
.qhp{display:flex;align-items:center;gap:5pt;flex-wrap:wrap;border-top:1pt solid #2a2335;border-bottom:1pt solid #2a2335;padding:4pt 0}
.hl{font-size:6.2pt;letter-spacing:.12em;text-transform:uppercase;color:var(--dim);font-weight:700}
.qhp .cc i{width:10.5pt;height:10.5pt;border:1.2pt solid #2a2335}
.qhp .cc i.ex{border-style:dotted;opacity:.5}
.tiny{font-size:6pt;color:var(--dim);font-style:italic}
.qm{display:grid;gap:4pt}
.m{display:grid;grid-template-columns:auto 1fr;gap:5pt;font-size:8.2pt;line-height:1.28}
.k{font-family:var(--disp);font-size:6pt;letter-spacing:.06em;padding:1.4pt 3.6pt;border-radius:2pt;color:#fff;white-space:nowrap;margin-top:.6pt}
.k.a{background:#b4542c}.k.s{background:#3d7350}.k.g{background:#a8761b}.k.c{background:#2a2335}
.qrel{margin-top:auto;display:grid;gap:6pt;padding-top:5pt}
.qrel .nl{border-bottom:0.8pt solid #2a2335;opacity:.5;height:1pt}
.qf{display:flex;gap:13pt;font-size:8pt;padding-top:4pt;border-top:1pt solid #2a2335}
.ln{display:inline-block;width:42pt;border-bottom:1pt solid #2a2335}.ln.lg{width:92pt}
</style></head><body>
${cpages.map(p=>`<div class="page">${p.join('')}</div>`).join('')}
${hpages.map(p=>`<div class="sheetpage">${p.join('')}</div>`).join('')}
</body></html>`;
fs.writeFileSync(__dirname+'/print-copperfoot.html',html);
console.log('card pages:',cpages.length,'| sheet pages:',hpages.length,'| cards:',cards.length,'| heroes:',ROSTER.length);
