/* ===== race-driven portrait engine — built to the contour-clock spec =====
   Every race breaks the silhouette at a different clock position, carries its own
   skull geometry, head:shoulder ratio, nose quadrant, iris treatment and ink weight. */
let __uid=0;
function _h(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');
  return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function shade(hex,p){const[r,g,b]=_h(hex);const t=p>0?255:0,a=Math.abs(p)/100;
  const m=v=>Math.round(v+(t-v)*a).toString(16).padStart(2,'0');return '#'+m(r)+m(g)+m(b);}
function mix(a,b,t){const A=_h(a),B=_h(b);
  return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('');}

/* full widths in the 100x118 box; halved when drawn */
const RACES={
 human:    {tw:44,ck:42,jw:34,cw:16,top:18,chin:78,eye:52,neck:18,sh:84,shY:100,ink:2.4,
            eyeS:1,eyeR:.72,gap:1,tilt:0,brow:3,browY:8,iris:'plain',
            nw:12,nl:14,mouth:70,mw:16,hair:'statement',tell:'none'},
 dwarf:    {tw:50,ck:48,jw:40,cw:20,top:22,chin:78,eye:54,neck:27,sh:91,shY:100,ink:3.2,
            eyeS:.9,eyeR:.5,gap:1.1,tilt:0,brow:5,browY:5,iris:'dark',
            nw:18,nl:12,mouth:72,mw:14,hair:'lobes',tell:'beard'},
 gnome:    {tw:40,ck:39,jw:26,cw:14,top:16,chin:78,eye:52,neck:14,sh:59,shY:101,ink:2.4,
            eyeS:1.35,eyeR:.95,gap:.95,tilt:3,brow:2.5,browY:10,iris:'big',
            nw:16,nl:17,mouth:73,mw:13,hair:'spikes',tell:'paddles'},
 halfling: {tw:38,ck:46,jw:29,cw:15,top:20,chin:78,eye:54,neck:14,sh:54,shY:102,ink:2.4,
            eyeS:1.15,eyeR:.8,gap:1.05,tilt:0,brow:3,browY:7,iris:'plain',
            nw:11.5,nl:10,mouth:71,mw:19,hair:'scallop',tell:'cheeks'},
 halforc:  {tw:44,ck:47,jw:41,cw:19,top:24,chin:78,eye:52,neck:31,sh:101,shY:100,ink:3.2,
            eyeS:.85,eyeR:.55,gap:1.1,tilt:6,brow:6,browY:4,iris:'amber',
            nw:17,nl:11,mouth:68,mw:21,hair:'crest',tell:'tusks'},
 elf:      {tw:42,ck:43,jw:27,cw:12,top:12,chin:78,eye:52,neck:14,sh:76,shY:98,ink:2,
            eyeS:1.05,eyeR:.6,gap:.92,tilt:8,brow:2,browY:12,iris:'bright',
            nw:9,nl:15.5,mouth:70,mw:15,hair:'straight',tell:'blades'},
 tiefling: {tw:45,ck:43,jw:29,cw:13,top:17,chin:78,eye:52,neck:16,sh:80,shY:100,ink:2,
            eyeS:1.1,eyeR:.7,gap:1,tilt:6,brow:4,browY:9,iris:'orb',
            nw:11,nl:14,mouth:70,mw:15,hair:'flames',tell:'horns'},
 mouse:    {tw:34,ck:33,jw:24,cw:12,top:24,chin:76,eye:54,neck:13,sh:50,shY:101,ink:2.4,
            eyeS:1.3,eyeR:.92,gap:1,tilt:4,brow:2.5,browY:9,iris:'big',
            nw:7,nl:12,mouth:72,mw:10,hair:false,tell:'rounders'},
 goblin:   {tw:38,ck:36,jw:30,cw:13,top:22,chin:78,eye:52,neck:15,sh:58,shY:101,ink:2.8,
            eyeS:1.1,eyeR:.62,gap:1.05,tilt:7,brow:4,browY:6,iris:'amber',
            nw:15,nl:16,mouth:72,mw:14,hair:false,tell:'blades'},
 beetle:   {tw:40,ck:38,jw:32,cw:18,top:22,chin:76,eye:52,neck:17,sh:62,shY:101,ink:2.8,
            eyeS:1,eyeR:.7,gap:1.15,tilt:0,brow:3.5,browY:7,iris:'amber',
            nw:0,nl:0,mouth:70,mw:14,hair:false,tell:'antennae'},
 construct:{tw:50,ck:48,jw:46,cw:34,top:20,chin:80,eye:50,neck:30,sh:99,shY:100,ink:3.4,
            eyeS:.9,eyeR:.5,gap:1.2,tilt:0,brow:5,browY:4,iris:'slit',
            nw:0,nl:0,mouth:74,mw:26,hair:false,tell:'none'},
 dragonborn:{tw:48,ck:46,jw:34,cw:25,top:20,chin:82,eye:48,neck:29,sh:97,shY:100,ink:3.2,
            eyeS:.8,eyeR:.45,gap:1.25,tilt:5,brow:5,browY:3,iris:'slit',
            nw:0,nl:0,mouth:76,mw:34,hair:'crest-plates',tell:'frills'}
};

/* smooth closed curve through a ring of points — no corners anywhere */
function smoothClosed(pts,t){
  t=(t===undefined?1:t);
  const n=pts.length;
  let d=`M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for(let i=0;i<n;i++){
    const p0=pts[(i-1+n)%n],p1=pts[i],p2=pts[(i+1)%n],p3=pts[(i+2)%n];
    const c1x=p1[0]+(p2[0]-p0[0])/6*t, c1y=p1[1]+(p2[1]-p0[1])/6*t;
    const c2x=p2[0]-(p3[0]-p1[0])/6*t, c2y=p2[1]-(p3[1]-p1[1])/6*t;
    d+=` C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d+' Z';
}
function skullPath(R){
  const tw=R.tw/2,ck=R.ck/2,jw=R.jw/2,cw=R.cw/2,top=R.top,ch=R.chin;
  const tempY=top+(ch-top)*.30, ckY=R.eye+5, jawY=ch-(ch-ckY)*.36, chY=ch-(ch-jawY)*.42;
  return smoothClosed([
    [50,top],[50+tw,tempY],[50+ck,ckY],[50+jw,jawY],[50+cw,chY],
    [50,ch],[50-cw,chY],[50-jw,jawY],[50-ck,ckY],[50-tw,tempY]
  ],1.14);
}
function torsoPath(R){
  const s=R.sh/2,n=R.neck/2,y=R.shY;
  return `M${50-s} 122 Q${50-s+7} ${y+4} ${50-n-3} ${y-2} L${50+n+3} ${y-2} Q${50+s-7} ${y+4} ${50+s} 122 Z`;
}

/* per-race iris rendering — one of the cheapest species channels there is */
function irisArt(kind,cx,cy,r,iris,INK,id){
  if(kind==='orb')  return `<ellipse cx="${cx}" cy="${cy}" rx="${r*1.05}" ry="${r*1.15}" fill="${iris}"/>
    <circle cx="${cx-r*.3}" cy="${cy-r*.4}" r="${r*.3}" fill="#fff" opacity=".9"/>`;
  if(kind==='slit') return `<ellipse cx="${cx}" cy="${cy}" rx="${r*1.05}" ry="${r*1.15}" fill="${iris}"/>
    <rect x="${cx-1.1}" y="${cy-r*.82}" width="2.2" height="${r*1.64}" rx="1.1" fill="${INK}"/>
    <circle cx="${cx-r*.36}" cy="${cy-r*.45}" r="${r*.22}" fill="#fff" opacity=".85"/>`;
  const sizes={dark:.95,big:.92,amber:.72,bright:.88,plain:.8}[kind]||.8;
  const pupil={dark:.58,big:.4,amber:.46,bright:.42,plain:.46}[kind]||.46;
  let s=`<circle cx="${cx}" cy="${cy}" r="${r*sizes}" fill="url(#ir${id})"/>
   <circle cx="${cx}" cy="${cy}" r="${r*sizes*pupil}" fill="${INK}"/>`;
  if(kind==='bright')s+=`<circle cx="${cx}" cy="${cy}" r="${r*sizes}" fill="none" stroke="${shade(iris,-55)}" stroke-width="1.4"/>`;
  s+=`<circle cx="${cx-r*.34}" cy="${cy-r*.42}" r="${r*(kind==='big'?.34:.26)}" fill="#fff"/>`;
  return s;
}

function figure(a){
  const id=++__uid, light=!!a.light;
  const R=Object.assign({},RACES[a.race]||RACES.human,a.tweak||{});
  R.neck=R.neck*.66;                 /* slimmer necks */
  R.shY=R.chin+13;                   /* shoulders closer in, so less neck shows */
  const TN=a.turn||0, TL=a.tilt||0;  /* three-quarter turn and head tilt */
  const FX=TN*7, ZOOM=a.zoom||1.22;  /* crop in: the head fills more of the card */
  const SKULL=skullPath(R), TORSO=torsoPath(R);
  const INK=a.ink||'#15101b', IW=R.ink, IN=IW*.55;
  const sk=a.skin, skSh=a.shadow||shade(sk,-28), skHi=shade(sk,16);
  const su=a.suit, suSh=shade(su,-34);
  const rim=light?'#fff4dc':(a.rim||'#ffe3ad');
  const rawA=a.bgA||'#7a46b0', rawB=a.bgB||'#1b0f2c';
  const bgA=light?mix(rawA,'#ffffff',.74):rawA, bgB=light?mix(rawA,'#ffffff',.42):rawB;
  const iris=a.iris||'#4e9ad6', horn=a.horn||'#e6dcc2';
  const ey=R.eye, tw=R.tw/2, ck=R.ck/2, jw=R.jw/2;
  let ex=4.6*R.eyeS; const gap=ex*1.55*R.gap;
  const hair=a.hair||'#2a1a14';

  let s=`<defs>
   <radialGradient id="bg${id}" cx="50%" cy="28%" r="88%">
     <stop offset="0" stop-color="${light?mix(bgA,'#ffffff',.5):shade(bgA,24)}"/>
     <stop offset=".46" stop-color="${bgA}"/><stop offset="1" stop-color="${bgB}"/></radialGradient>
   <radialGradient id="ir${id}" cx="38%" cy="28%" r="74%">
     <stop offset="0" stop-color="${shade(iris,52)}"/><stop offset=".55" stop-color="${iris}"/>
     <stop offset="1" stop-color="${shade(iris,-48)}"/></radialGradient>
   <linearGradient id="hn${id}" x1="0" y1="1" x2=".3" y2="0">
     <stop offset="0" stop-color="${shade(horn,-26)}"/><stop offset="1" stop-color="${shade(horn,30)}"/></linearGradient>
   <radialGradient id="vg${id}" cx="46%" cy="38%" r="72%">
     <stop offset=".46" stop-color="#000" stop-opacity="0"/>
     <stop offset="1" stop-color="#000" stop-opacity="${light?.14:.55}"/></radialGradient>
   <clipPath id="ch${id}"><path d="${SKULL}"/></clipPath>
  </defs>
  <rect width="100" height="118" fill="url(#bg${id})"/>
  <circle cx="76" cy="19" r="14" fill="${light?'#ffffff':shade(bgA,58)}" opacity="${light?.4:.24}"/>`;

  let g='';


  const T=R.tell;
  const ink=(d,w,f)=>`<path d="${d}" fill="${f||'none'}" stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;

  /* ---- 10 & 2 : elf ear blades, swept up-back 55deg ---- */
  if(T==='blades'){
    g+=ink(`M${50-tw+1} ${ey-2} L${50-tw-16} ${34} L${50-tw-3} ${ey+9} Z`,IW,sk)
      +ink(`M${50+tw-1} ${ey-2} L${50+tw+16} ${34} L${50+tw+3} ${ey+9} Z`,IW,sk)
      +ink(`M${50-tw-3} ${ey+1} L${50-tw-13} ${38}`,IN)+ink(`M${50+tw+3} ${ey+1} L${50+tw+13} ${38}`,IN);
  }
  /* ---- 9 & 3 : gnome paddles, blunt and wide, 40deg ---- */
  if(T==='paddles'){
    const pad=(dir)=>`M${50+dir*(tw-1)} ${ey-5} Q${50+dir*(tw+17)} ${ey-14} ${50+dir*(tw+19)} ${ey-3}
      Q${50+dir*(tw+17)} ${ey+9} ${50+dir*(tw-1)} ${ey+7} Z`;
    g+=ink(pad(-1),IW,sk)+ink(pad(1),IW,sk)
      +ink(`M${50-tw-4} ${ey-2} Q${50-tw-11} ${ey-4} ${50-tw-13} ${ey+1}`,IN)
      +ink(`M${50+tw+4} ${ey-2} Q${50+tw+11} ${ey-4} ${50+tw+13} ${ey+1}`,IN);
  }
  /* ---- 11 & 1 : tiefling horns growing out of a brow mound ---- */
  if(T==='horns'){
    const hornP=(d)=>`M${50+d*8} ${ey-14} C${50+d*7} ${R.top-2} ${50+d*12} ${R.top-11} ${50+d*26} ${R.top-13}
      C${50+d*17} ${R.top-6} ${50+d*16} ${R.top+3} ${50+d*18} ${ey-13} Z`;
    g+=ink(hornP(-1),IW+.4,`url(#hn${id})`)+ink(hornP(1),IW+.4,`url(#hn${id})`)
      +ink(`M${50-12} ${R.top-6} C${50-8} ${R.top-10} ${50-4} ${R.top-10} ${50-2} ${R.top-6}`,IN,'');
  }
  /* ---- dragonborn: backswept horns + crest plates, no ears ---- */
  if(T==='frills'){
    g+=ink(`M${50-tw+4} ${ey-8} C${50-tw-10} ${ey-11} ${50-tw-18} ${ey-6} ${50-tw-21} ${ey+2} C${50-tw-12} ${ey-2} ${50-tw-4} ${ey-1} ${50-tw+2} ${ey-1} Z`,IW,`url(#hn${id})`)
      +ink(`M${50+tw-4} ${ey-8} C${50+tw+10} ${ey-11} ${50+tw+18} ${ey-6} ${50+tw+21} ${ey+2} C${50+tw+12} ${ey-2} ${50+tw+4} ${ey-1} ${50+tw-2} ${ey-1} Z`,IW,`url(#hn${id})`);
  }

  /* ---- 9 & 3 : big round mouse ears ---- */
  if(T==='rounders'){
    g+=`<circle cx="${50-tw-4}" cy="${R.top+7}" r="13" fill="${sk}" stroke="${INK}" stroke-width="${IW}"/>
        <circle cx="${50+tw+4}" cy="${R.top+7}" r="13" fill="${sk}" stroke="${INK}" stroke-width="${IW}"/>
        <circle cx="${50-tw-4}" cy="${R.top+8}" r="6.6" fill="${shade(sk,-26)}"/>
        <circle cx="${50+tw+4}" cy="${R.top+8}" r="6.6" fill="${shade(sk,-26)}"/>`;
  }
  /* ---- 11 & 1 : antennae ---- */
  if(T==='antennae'){
    g+=ink(`M${50-11} ${R.top+4} C${50-18} ${R.top-12} ${50-24} ${R.top-18} ${50-32} ${R.top-21}`,IW)
      +ink(`M${50+11} ${R.top+4} C${50+18} ${R.top-12} ${50+24} ${R.top-18} ${50+32} ${R.top-21}`,IW)
      +`<circle cx="${50-33}" cy="${R.top-22}" r="5" fill="url(#hn${id})" stroke="${INK}" stroke-width="${IN*1.5}"/>
        <circle cx="${50+33}" cy="${R.top-22}" r="5" fill="url(#hn${id})" stroke="${INK}" stroke-width="${IN*1.5}"/>`;
  }

  /* ---- torso ---- */
  g+=`<path d="M${50-R.neck/2} ${R.chin-6} L${50-R.neck/2} ${R.shY} L${50+R.neck/2} ${R.shY} L${50+R.neck/2} ${R.chin-6} Z" fill="${sk}" stroke="${INK}" stroke-width="${IW}"/>`;
  g+=`<path d="${TORSO}" fill="${su}"/>
   <path d="M${50+R.neck/2-2} ${R.shY-4} C${50+R.neck/2-8} ${R.shY+8} ${50+R.neck/2-6} ${R.shY+16} ${50+R.neck/2} 122 L${50+R.sh/2} 122 Q${50+R.sh/2-7} ${R.shY+4} ${50+R.neck/2+3} ${R.shY-2} Z" fill="${suSh}"/>
   <path d="${TORSO}" fill="none" stroke="${INK}" stroke-width="${IW+.6}" stroke-linejoin="round"/>`;

  /* ---- skull: flat base, one hard race-shaped shadow, ink ---- */
  g+=`<g><path d="${SKULL}" fill="${sk}"/><g clip-path="url(#ch${id})">`;
  const SH={
   dwarf:`<path d="M${50-tw} ${ey-11} h${tw*2} v10 q${-tw} 7 ${-tw*2} 0 Z" fill="${skSh}"/>`,
   halforc:`<path d="M${50-tw} ${ey-10} h${tw*2} v9 q${-tw} 7 ${-tw*2} 0 Z" fill="${skSh}"/>
     <path d="M${50+jw-6} ${R.chin-22} L${50+ck} ${R.chin-26} L${50+ck} ${R.chin} L${50+jw-10} ${R.chin} Z" fill="${skSh}" opacity=".8"/>`,
   elf:`<path d="M${50+ck-2} ${ey+2} L${50+10} ${R.mouth+2} L${50+4} ${R.mouth+2} L${50+ck-9} ${ey+3} Z" fill="${skSh}"/>`,
   gnome:`<ellipse cx="50" cy="${ey+R.nl*.92}" rx="${R.nw*.62}" ry="5" fill="${skSh}"/>`,
   halfling:`<path d="M${50+ck-3} ${ey+3} Q${50+ck-6} ${ey+17} ${50+jw-2} ${ey+21} L${50+ck} ${ey+21} L${50+ck} ${ey+2} Z" fill="${skSh}"/>`,
   dragonborn:`<path d="M${50+R.cw/2-3} ${ey+4} L${50+ck} ${ey+2} L${50+ck-2} ${R.chin} L${50+R.cw/2-3} ${R.chin} Z" fill="${skSh}"/>`,
   tiefling:`<path d="M${50-tw} ${R.top+2} h${tw*2} v11 q${-tw} 9 ${-tw*2} 0 Z" fill="${skSh}"/>
     <path d="M${50-20} ${ey-10} Q50 ${R.top-4} ${50+20} ${ey-10} Q50 ${ey-4} ${50-20} ${ey-10} Z" fill="${skHi}" opacity=".45"/>`
  }[a.race]||'';
  g+=SH+`<path d="M${50+tw*.56} ${R.top-4} C${50+tw*.16} ${ey-8} ${50+tw*.16} ${ey+22} ${50+tw*.56} ${R.chin+4} L110 ${R.chin+4} L110 ${R.top-4} Z" fill="${skSh}" opacity=".55"/>
   <ellipse cx="${50-tw*.46}" cy="${ey-10}" rx="${tw*.38}" ry="8" fill="${skHi}" opacity=".5" transform="rotate(-18 ${50-tw*.46} ${ey-10})"/>
   </g><path d="${SKULL}" fill="none" stroke="${INK}" stroke-width="${IW+.6}" stroke-linejoin="round"/></g>`;

  /* ---- ordinary ears for the races that have them ---- */
  if(T==='none'||T==='cheeks'||T==='beard'){
    const h=T==='beard'?6.5:5, yo=T==='beard'?2:0;
    g+=ink(`M${50-tw+1} ${ey+yo} C${50-tw-5} ${ey+yo-1} ${50-tw-6} ${ey+yo+h} ${50-tw-3} ${ey+yo+h*1.5} C${50-tw-1} ${ey+yo+h*1.9} ${50-tw+2} ${ey+yo+h*1.9} ${50-tw+3} ${ey+yo+h*1.4}`,IN*1.6,sk)
      +ink(`M${50+tw-1} ${ey+yo} C${50+tw+5} ${ey+yo-1} ${50+tw+6} ${ey+yo+h} ${50+tw+3} ${ey+yo+h*1.5} C${50+tw+1} ${ey+yo+h*1.9} ${50+tw-2} ${ey+yo+h*1.9} ${50+tw-3} ${ey+yo+h*1.4}`,IN*1.6,sk);
  }
  if(T==='tusks'){ /* small, slightly pointed, never the identifying feature */
    g+=ink(`M${50-tw+1} ${ey-2} L${50-tw-7} ${ey-5} L${50-tw-4} ${ey+7} Z`,IN*1.6,sk)
      +ink(`M${50+tw-1} ${ey-2} L${50+tw+7} ${ey-5} L${50+tw+4} ${ey+7} Z`,IN*1.6,sk);
  }

  /* ---- hair, by shape language ---- */
  const HAIR={
   statement:()=>ink(`M${50-tw-1} ${ey-6} Q${50-tw+2} ${R.top-5} 50 ${R.top-7} Q${50+tw+4} ${R.top-3} ${50+tw+2} ${ey-4} Q${50+tw-4} ${ey-20} ${50+tw-16} ${ey-17} Q50 ${R.top+2} ${50-tw+14} ${ey-16} Q${50-tw+4} ${ey-20} ${50-tw-1} ${ey-6} Z`,IW,hair),
   lobes:()=>ink(`M${50-tw-1} ${ey-11} Q${50-tw-2} ${R.top-6} ${50-10} ${R.top-8} Q50 ${R.top-12} ${50+10} ${R.top-8} Q${50+tw+2} ${R.top-6} ${50+tw+1} ${ey-11} Q${50+tw-7} ${ey-20} ${50+8} ${ey-17} Q50 ${ey-22} ${50-8} ${ey-17} Q${50-tw+7} ${ey-20} ${50-tw-1} ${ey-11} Z`,IW,hair),
   spikes:()=>{const H=[13,9,17,11,15,8,12],L=[-.9,-.6,-.25,.1,.4,.7,.95];let p='';
     p+=ink(`M${50-tw-1} ${ey-6} Q50 ${R.top-2} ${50+tw+1} ${ey-6} Q50 ${ey-16} ${50-tw-1} ${ey-6} Z`,IN*1.5,hair);
     for(let i=0;i<7;i++){const t=L[i],x=50+t*(tw-1),h=H[i];
      p+=ink(`M${x-6} ${R.top+5} Q${x+t*7} ${R.top-h*.5} ${x+t*9} ${R.top-h} Q${x+t*2} ${R.top-h*.3} ${x+5} ${R.top+6} Z`,IN*1.4,hair);}
     return p;},
   scallop:()=>{const P=[[-1,2,8],[-.62,-2,7.4],[-.22,-4,8.2],[.2,-3,7.6],[.6,-1,8],[.95,3,7]];
     let p=ink(`M${50-tw-2} ${ey-3} Q50 ${R.top-7} ${50+tw+2} ${ey-3} Q${50+tw-6} ${ey-15} 50 ${ey-13} Q${50-tw+6} ${ey-15} ${50-tw-2} ${ey-3} Z`,IN*1.5,hair);
     P.forEach(([t,dy,r])=>{p+=`<circle cx="${50+t*(tw-2)}" cy="${R.top+3+dy}" r="${r}" fill="${hair}" stroke="${INK}" stroke-width="${IN*1.3}"/>`;});
     P.forEach(([t,dy,r])=>{p+=`<circle cx="${50+t*(tw-2)-r*.3}" cy="${R.top+1+dy}" r="${r*.42}" fill="${shade(hair,22)}" opacity=".5"/>`;});
     return p;},
   straight:()=>ink(`M${50-tw-2} ${R.chin+4} Q${50-tw-4} ${R.top+4} 50 ${R.top-6} Q${50+tw+4} ${R.top+4} ${50+tw+2} ${R.chin+4} Q${50+tw-5} ${ey-16} 50 ${ey-14} Q${50-tw+5} ${ey-16} ${50-tw-2} ${R.chin+4} Z`,IW,hair),
   flames:()=>{let p=ink(`M${50-tw+3} ${ey-10} Q50 ${R.top+10} ${50+tw-3} ${ey-10} Q${50+tw-8} ${ey-19} 50 ${ey-17} Q${50-tw+8} ${ey-19} ${50-tw+3} ${ey-10} Z`,IN*1.5,hair);
     for(let i=0;i<4;i++){const t=-.8+1.6*i/3,x=50+t*(tw-4);
      p+=ink(`M${x-5} ${ey-13} Q${x+t*8} ${R.top+2} ${x+t*12} ${R.top-4} Q${x+t*3} ${ey-19} ${x+5} ${ey-12} Z`,IN*1.4,hair);}return p;},
   crest:()=>ink(`M${50-9} ${R.top+6} Q50 ${R.top-16} ${50+9} ${R.top+6} Q50 ${R.top+1} ${50-9} ${R.top+6} Z`,IW,hair)
     +ink(`M${50-tw+2} ${ey-8} Q50 ${R.top+8} ${50+tw-2} ${ey-8} Q50 ${R.top+14} ${50-tw+2} ${ey-8} Z`,IN*1.5,hair),
   'crest-plates':()=>{let p='';for(let i=0;i<4;i++){const w=9-i*1.4;
     p+=ink(`M${50-w} ${R.top+6-i*0} Q50 ${R.top-7-i*3} ${50+w} ${R.top+6} Q50 ${R.top+2} ${50-w} ${R.top+6} Z`,IN*1.5,shade(sk,-18));}
     return p;}
  };
  if(a.hair!==false&&HAIR[R.hair])g+=HAIR[R.hair]();

  /* ---- 5 to 7 : the dwarf beard, wider than the skull ---- */
  if(T==='beard'){
    const bTop=ey+R.nl+11;  /* sits clear below the bulbous nose */
    g+=ink(`M${50-tw+1} ${ey+14} Q${50-tw-6} ${R.chin+6} ${50-27} ${R.shY+2} Q50 ${R.shY+12} ${50+27} ${R.shY+2} Q${50+tw+6} ${R.chin+6} ${50+tw-1} ${ey+14} Q${50+13} ${bTop-2} 50 ${bTop+1} Q${50-13} ${bTop-2} ${50-tw+1} ${ey+14} Z`,IW,hair)
      +ink(`M${50-11} ${bTop+1} Q${50-5} ${bTop-4} 50 ${bTop+2} Q${50+5} ${bTop-4} ${50+11} ${bTop+1} Q${50+5} ${bTop+7} 50 ${bTop+4} Q${50-5} ${bTop+7} ${50-11} ${bTop+1} Z`,IN*1.3,shade(hair,20))
      +`<circle cx="${50-tw-3}" cy="${R.chin-6}" r="4.4" fill="${shade(hair,-22)}" stroke="${INK}" stroke-width="${IN*1.3}"/>
        <circle cx="${50+tw+3}" cy="${R.chin-6}" r="4.4" fill="${shade(hair,-22)}" stroke="${INK}" stroke-width="${IN*1.3}"/>`;
  }

  /* ---- eyes ---- */
  let f='';
  const eyePair=(cx,flip,n,sc)=>{
    const ex0=ex; ex=ex*(sc||1);
    const ry=ex*R.eyeR, cid='e'+id+n, d=flip?-1:1;
    const al=`M${cx-ex} ${ey} C${cx-ex*.5} ${ey-ry*1.62} ${cx+ex*.5} ${ey-ry*1.62} ${cx+ex} ${ey}
      C${cx+ex*.5} ${ey+ry*1.3} ${cx-ex*.5} ${ey+ry*1.3} ${cx-ex} ${ey} Z`;
    const noWhite=R.iris==='orb'||R.iris==='slit';
    const out=`<g transform="rotate(${d*-R.tilt} ${cx} ${ey})">
     <defs><clipPath id="${cid}"><path d="${al}"/></clipPath></defs>
     <path d="${al}" fill="${noWhite?'none':'#fffaf0'}"/>
     <g clip-path="url(#${cid})">${irisArt(R.iris,cx+d*.8,ey+ry*.1,ry*1.08,iris,INK,id)}
      <path d="M${cx-ex-2} ${ey-ry*1.5} h${ex*2+4} v${ry*.5} q${-ex} ${ry*.3} ${-ex*2} 0 Z" fill="${INK}" opacity=".2"/></g>
     <path d="M${cx-ex} ${ey} C${cx-ex*.5} ${ey-ry*1.62} ${cx+ex*.5} ${ey-ry*1.62} ${cx+ex} ${ey}" fill="none" stroke="${INK}" stroke-width="${IW+1}" stroke-linecap="round"/>
     <path d="M${cx-ex} ${ey} C${cx-ex*.5} ${ey+ry*1.3} ${cx+ex*.5} ${ey+ry*1.3} ${cx+ex} ${ey}" fill="none" stroke="${INK}" stroke-width="${IN}" opacity=".8"/>
    </g>`; ex=ex0; return out;
  };
  const farSc=1-Math.abs(TN)*.34, nearSc=1+Math.abs(TN)*.06;
  f+=eyePair(50-gap+(TN>0?FX*.5:0),false,0,TN>0?farSc:nearSc)
    +eyePair(50+gap+(TN<0?FX*.5:0),true,1,TN<0?farSc:nearSc);

  /* brow: flat bar for dwarf, tapering slant for half-orc, shelf for dragonborn */
  const by=ey-R.browY;
  if(a.race==='dwarf')f+=ink(`M${50-tw+3} ${by} L${50+tw-3} ${by}`,R.brow);
  else if(a.race==='halforc')f+=ink(`M${50-tw+2} ${by-3} L${50-4} ${by+3}`,R.brow)+ink(`M${50+tw-2} ${by-3} L${50+4} ${by+3}`,R.brow);
  else if(a.race==='dragonborn')f+=ink(`M${50-tw+2} ${by+1} Q50 ${by-4} ${50+tw-2} ${by+1}`,R.brow);
  else {f+=ink(`M${50-gap-ex-1} ${by+1} Q${50-gap} ${by-4} ${50-gap+ex*.7} ${by}`,R.brow)
         +ink(`M${50+gap+ex+1} ${by+1} Q${50+gap} ${by-4} ${50+gap-ex*.7} ${by}`,R.brow);}

  /* ---- nose: a different width/length quadrant per race ---- */
  if(a.race==='mouse'){
    f+=`<ellipse cx="50" cy="${ey+13}" rx="3" ry="2.4" fill="#c4707f" stroke="${INK}" stroke-width="${IN*1.5}"/>`
      +ink(`M${50-5} ${ey+12} L${50-17} ${ey+8} M${50-5} ${ey+14} L${50-16} ${ey+17} M${50+5} ${ey+12} L${50+17} ${ey+8} M${50+5} ${ey+14} L${50+16} ${ey+17}`,IN*.9);
  } else if(a.race==='beetle'||a.race==='construct'){
    f+=ink(`M${50-7} ${ey+11} L${50+7} ${ey+11}`,IN*1.3);
  } else if(a.race==='dragonborn'){
    f+=ink(`M50 ${ey+4} L50 ${R.mouth-8}`,IN,'')
      +ink(`M${50-6} ${R.mouth-10} q2 3 .5 4`,IN*1.6)+ink(`M${50+6} ${R.mouth-10} q-2 3 -.5 4`,IN*1.6);
  } else {
    const nt=ey+R.nl, nw=R.nw/2;
    const bulb=(a.race==='dwarf'||a.race==='gnome');
    if(bulb)f+=`<ellipse cx="50" cy="${nt-2}" rx="${nw}" ry="${nw*(a.race==='gnome'?.92:.78)}" fill="${sk}" stroke="${INK}" stroke-width="${IW}"/>`;
    else f+=ink(`M50 ${ey+2} L${49-R.nw*.06} ${nt-3}`,IN,'')+ink(`M${50-nw*.7} ${nt} Q50 ${nt+3.4} ${50+nw*.7} ${nt}`,IW*.9);
    f+=ink(`M${50-nw*.78} ${nt-2} q${nw*.3} 2.6 0 3.4`,IN*1.3)+ink(`M${50+nw*.78} ${nt-2} q${-nw*.3} 2.6 0 3.4`,IN*1.3);
  }

  /* ---- mouth, tusks, fangs ---- */
  const mY=R.mouth, mw=R.mw/2;
  if(a.race==='dragonborn'){
    f+=ink(`M${50-mw} ${mY} Q50 ${mY+4} ${50+mw} ${mY}`,IW)
      +ink(`M${50-mw} ${mY} q2 -3 4 -3 M${50+mw} ${mY} q-2 -3 -4 -3`,IN);
  } else if(a.mouth==='fang'||a.race==='tiefling'){
    f+=ink(`M${50-mw} ${mY-1} Q50 ${mY+7} ${50+mw} ${mY-1}`,IW);
    if(a.race==='tiefling')f+=`<path d="M${50-5} ${mY+1} l2 4.4 l2 -4.4 Z" fill="#fffaf0" stroke="${INK}" stroke-width="${IN*.8}"/>
      <path d="M${50+1} ${mY+1} l2 4.4 l2 -4.4 Z" fill="#fffaf0" stroke="${INK}" stroke-width="${IN*.8}"/>`;
  } else if(a.mouth==='open'){
    f+=`<path d="M${50-mw*.8} ${mY-1} Q50 ${mY-5} ${50+mw*.8} ${mY-1} Q${50+mw*.6} ${mY+9} 50 ${mY+10} Q${50-mw*.6} ${mY+9} ${50-mw*.8} ${mY-1} Z" fill="#4a1a24" stroke="${INK}" stroke-width="${IW}"/>
      <ellipse cx="50" cy="${mY+6.5}" rx="4" ry="2.4" fill="#cf5a6e"/>`;
  } else {
    f+=ink(`M${50-mw} ${mY-1} Q50 ${mY+7} ${50+mw} ${mY-1}`,IW)
      +ink(`M${50-mw*.6} ${mY+4} Q50 ${mY+6} ${50+mw*.6} ${mY+4}`,IN*.9);
  }
  /* 6 o'clock: half-orc tusks break the contour UPWARD from the lower lip */
  if(T==='tusks'){
    f+=`<path d="M${50-9} ${mY+3} L${50-5.5} ${mY-9} L${50-2} ${mY+3} Z" fill="#fffaf0" stroke="${INK}" stroke-width="${IN*1.4}" stroke-linejoin="round"/>
        <path d="M${50+2} ${mY+3} L${50+5.5} ${mY-9} L${50+9} ${mY+3} Z" fill="#fffaf0" stroke="${INK}" stroke-width="${IN*1.4}" stroke-linejoin="round"/>`;
  }
  /* 4 & 8 o'clock: dragonborn jaw frills */
  if(T==='frills'){
    [[-1],[1]].forEach(([d])=>{[25,45,65].forEach((ang,i)=>{
      const rad=ang*Math.PI/180, x0=50+d*(ck-2), y0=ey+10, L=12-i*1;
      g+=ink(`M${x0} ${y0+i*5} L${x0+d*Math.cos(rad)*L} ${y0+i*5+Math.sin(rad)*L} L${x0+d*2} ${y0+i*5+6} Z`,IN*1.5,shade(sk,-14));});});
  }
  /* halfling freckles */
  if(T==='cheeks')f+=`<g fill="${shade(sk,-30)}" opacity=".6">
    <circle cx="${50-9}" cy="${ey+8}" r="1.1"/><circle cx="${50-5}" cy="${ey+11}" r="1"/>
    <circle cx="${50+5}" cy="${ey+11}" r="1"/><circle cx="${50+9}" cy="${ey+8}" r="1.1"/>
    <circle cx="50" cy="${ey+12}" r=".9"/></g>`;

  if(a.chest)g+=`<circle cx="50" cy="${R.shY+12}" r="7.4" fill="${a.chestC||rim}" stroke="${INK}" stroke-width="${IW}"/>
    <circle cx="47.6" cy="${R.shY+9.6}" r="2.4" fill="#fff" opacity=".8"/>`;

  g+=`<g transform="translate(${FX} 0)">${f}</g>`;
  s+=`<g transform="translate(50 ${ey+6}) rotate(${TL}) scale(${ZOOM}) translate(-50 ${-(ey+6)})">${g}</g>`
   +`<rect width="100" height="118" fill="url(#vg${id})"/>`;
  return `<svg viewBox="0 0 100 118" role="img" aria-label="${a.name||'character'}">${s}</svg>`;
}

/* treasure icons — painterly objects on a lit ground */
function icon(kind,c1,c2,light){
  const id=++__uid, a=c1||'#d9a441', b=c2||'#8a4a22';
  const GRD=light?mix(a,'#ffffff',.84):'#09060f';
  const G=`<defs>
   <radialGradient id="ib${id}" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="${shade(a,30)}" stop-opacity=".5"/>
     <stop offset="1" stop-color="${light?mix(a,'#ffffff',.6):'#120f1c'}" stop-opacity="0"/></radialGradient>
   <linearGradient id="im${id}" x1="0" y1="0" x2=".4" y2="1">
     <stop offset="0" stop-color="${shade(a,42)}"/><stop offset=".5" stop-color="${a}"/><stop offset="1" stop-color="${shade(b,-20)}"/></linearGradient>
   <radialGradient id="ig${id}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${a}" stop-opacity=".75"/>
     <stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient></defs>
   <rect width="100" height="100" fill="${GRD}"/>
   <ellipse cx="42" cy="44" rx="50" ry="46" fill="url(#ib${id})" opacity="${light?.55:1}"/>
   <ellipse cx="50" cy="50" rx="33" ry="33" fill="url(#ig${id})" opacity="${light?.45:.95}"/>`;
  const F=`fill="url(#im${id})" stroke="#1a1426" stroke-width="2.6"`;
  const sh=`<ellipse cx="50" cy="79" rx="26" ry="6" fill="#000" opacity="${light?.2:.55}"/>
   <g fill="#e8b14a" stroke="#1a1426" stroke-width="1.4">
    <ellipse cx="31" cy="77" rx="7" ry="3"/><ellipse cx="45" cy="81" rx="8" ry="3.4"/>
    <ellipse cx="60" cy="78" rx="7.5" ry="3.2"/><ellipse cx="71" cy="81" rx="6" ry="2.8"/>
    <ellipse cx="52" cy="74" rx="6" ry="2.6"/></g>
   <g fill="${light?'#e8a93c':'#fff6d8'}" opacity=".9">
    <path d="M22 26 l1.8 5 l5 1.8 l-5 1.8 l-1.8 5 l-1.8 -5 l-5 -1.8 l5 -1.8 Z"/>
    <path d="M80 34 l1.3 3.6 l3.6 1.3 l-3.6 1.3 l-1.3 3.6 l-1.3 -3.6 l-3.6 -1.3 l3.6 -1.3 Z" opacity=".75"/>
    <path d="M70 18 l1 2.8 l2.8 1 l-2.8 1 l-1 2.8 l-1 -2.8 l-2.8 -1 l2.8 -1 Z" opacity=".6"/></g>`;
  const P={
   bell:`<path d="M50 20 q20 4 20 34 l6 10 h-52 l6 -10 q0 -30 20 -34 Z" ${F}/><circle cx="50" cy="72" r="5" ${F}/>
         <path d="M40 34 q6 -6 12 -4" stroke="#fff" stroke-width="2.6" opacity=".5" fill="none"/>`,
   crown:`<path d="M22 66 L18 28 L34 42 L50 20 L66 42 L82 28 L78 66 Z" ${F}/>
          <circle cx="50" cy="36" r="4.5" fill="#e7566d" stroke="#1a1426" stroke-width="1.8"/>
          <path d="M26 58 L74 58" stroke="#1a1426" stroke-width="2.4"/>`,
   amulet:`<path d="M34 22 q16 10 32 0" fill="none" stroke="${shade(a,-10)}" stroke-width="3.4"/>
           <path d="M50 34 l16 16 l-16 24 l-16 -24 Z" ${F}/>
           <path d="M50 40 l9 10 l-9 14 l-9 -14 Z" fill="#fff" opacity=".35"/>`,
   boots:`<path d="M30 24 h16 v34 l14 6 v10 h-30 Z" ${F}/><path d="M54 24 h16 v34 l10 6 v10 h-26 Z" ${F}/>`,
   lantern:`<path d="M34 34 h32 v40 h-32 Z" ${F}/><path d="M38 26 q12 -10 24 0" fill="none" stroke="${shade(a,-15)}" stroke-width="3.4"/>
            <ellipse cx="50" cy="54" rx="9" ry="13" fill="#ffe9a8"/><ellipse cx="50" cy="54" rx="4" ry="7" fill="#fff"/>`,
   hammer:`<path d="M26 28 h34 v20 h-34 Z" ${F}/><path d="M41 46 l8 0 l3 36 l-14 0 Z" ${F}/>`,
   feather:`<path d="M66 20 q-34 16 -34 56 q26 -4 34 -24 q8 -20 0 -32 Z" ${F}/>
            <path d="M60 28 q-20 14 -24 42" fill="none" stroke="#1a1426" stroke-width="2" opacity=".6"/>`,
   mirror:`<ellipse cx="50" cy="46" rx="22" ry="26" ${F}/><ellipse cx="50" cy="46" rx="15" ry="19" fill="#cfe6f5" opacity=".8"/>
           <path d="M40 34 q8 -4 14 2" stroke="#fff" stroke-width="3" fill="none"/><path d="M44 72 h12 v12 h-12 Z" ${F}/>`,
   food:`<path d="M24 58 q0 -26 26 -26 q26 0 26 26 Z" ${F}/><path d="M22 58 h56 v10 h-56 Z" fill="${shade(b,10)}" stroke="#1a1426" stroke-width="2.4"/>
         <circle cx="40" cy="46" r="3" fill="#fff" opacity=".5"/>`,
   pouch:`<path d="M30 42 q20 -12 40 0 q8 22 -2 36 q-18 8 -36 0 q-10 -14 -2 -36 Z" ${F}/>
          <path d="M34 42 q16 8 32 0" fill="none" stroke="#1a1426" stroke-width="2.4"/>`,
   gem:`<path d="M50 18 L74 40 L50 84 L26 40 Z" ${F}/><path d="M50 18 L62 40 L50 84 L38 40 Z" fill="#fff" opacity=".32"/>
        <path d="M26 40 L74 40" stroke="#1a1426" stroke-width="2"/>`,
   shield:`<path d="M50 18 q20 6 24 10 q2 34 -24 54 q-26 -20 -24 -54 q4 -4 24 -10 Z" ${F}/>
           <path d="M50 30 q10 4 12 6 q1 20 -12 32 q-13 -12 -12 -32 q2 -2 12 -6 Z" fill="#fff" opacity=".28"/>`,
   coal:`<path d="M30 56 q-6 -22 14 -26 q22 -6 28 14 q6 20 -12 26 q-24 8 -30 -14 Z" ${F}/>
         <ellipse cx="50" cy="48" rx="12" ry="10" fill="#ffd27a" opacity=".85"/><ellipse cx="50" cy="48" rx="6" ry="5" fill="#fff8e0"/>`,
   scroll:`<path d="M26 28 h48 v48 h-48 Z" ${F}/><path d="M26 28 q-8 24 0 48" fill="none" stroke="#1a1426" stroke-width="2.4"/>
           <path d="M38 44 h26 M38 54 h26 M38 64 h16" stroke="#1a1426" stroke-width="2.2" opacity=".55"/>`,
   tooth:`<path d="M34 24 h32 q4 28 -8 52 q-8 12 -16 0 q-12 -24 -8 -52 Z" ${F}/>
          <path d="M44 32 q4 20 0 34" fill="none" stroke="#fff" stroke-width="2.4" opacity=".4"/>`,
   star:`<path d="M50 16 L58 40 L84 42 L63 58 L70 84 L50 69 L30 84 L37 58 L16 42 L42 40 Z" ${F}/>`
  }[kind]||P2(kind);
  function P2(){return `<circle cx="50" cy="50" r="24" ${F}/>`}
  return `<svg viewBox="0 0 100 100" role="img" aria-label="${kind}">${G}${sh}${P}</svg>`;
}
