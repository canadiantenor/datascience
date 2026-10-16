/* Assembles the two adventure pages from the engine + data + page shells.
   Run:  node build-pages.js            → writes dist/*.html  */
const fs=require('fs'), path=require('path');
const D=__dirname, OUT=path.join(D,'dist');
fs.mkdirSync(OUT,{recursive:true});
const read=f=>fs.readFileSync(path.join(D,f),'utf8');
const engine=read('portrait-engine.js'), roster=read('roster.js');

const build=(shell,marks,out)=>{
  let s=read(shell);
  for(const [mark,file] of Object.entries(marks)){
    if(!s.includes(mark))throw new Error('missing marker '+mark+' in '+shell);
    s=s.replace(mark, file==='__ENGINE__'?engine : file==='__ROSTER__'?roster : read(file));
  }
  fs.writeFileSync(path.join(OUT,out),s);
  // syntax-check the inlined script
  new Function(s.split('<script>')[1].split('</script>')[0]);
  console.log(out.padEnd(28),s.length,'bytes');
};
build('page-copperfoot.html',
  {'/*__ART3__*/':'__ENGINE__','/*__CARDS__*/':'copperfoot-data.js','/*__ROSTER4__*/':'__ROSTER__'},
  'mother-of-copperfoot.html');
build('page-barleybrook.html',
  {'/*__ART3__*/':'__ENGINE__','/*__CAST__*/':'barleybrook-cast.js','/*__ROSTER4__*/':'__ROSTER__'},
  'bell-of-barleybrook.html');
