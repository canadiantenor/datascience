/* Renders the print HTML to PDF with headless Chromium.
   Run after the two build-print-*.js scripts:  node render-pdfs.js  */
const path=require('path'), fs=require('fs');
const {chromium}=require('/opt/node-tools/node_modules/playwright');
const D=__dirname, OUT=path.join(D,'dist');
const JOBS=[['print-copperfoot.html','Copperfoot-print-pack.pdf'],
            ['print-barleybrook.html','Bell-of-Barleybrook-sheets.pdf']];
(async()=>{
  fs.mkdirSync(OUT,{recursive:true});
  const b=await chromium.launch();
  for(const [src,out] of JOBS){
    const p=await b.newPage(); const errs=[];
    p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+path.join(D,src),{waitUntil:'networkidle'});
    await p.evaluate(()=>document.fonts.ready);
    await p.pdf({path:path.join(OUT,out),format:'Letter',printBackground:true,preferCSSPageSize:true});
    console.log(out.padEnd(34), errs.length?'ERRORS: '+errs.join(' | '):'ok');
    await p.close();
  }
  await b.close();
})();
