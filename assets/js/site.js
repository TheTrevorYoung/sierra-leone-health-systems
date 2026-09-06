(()=>{
  const projectBase=location.pathname.includes('/sierra-leone-health-systems/')?'/sierra-leone-health-systems/':'/';
  const url=(path='')=>projectBase+path;

  const style=document.createElement('style');
  style.textContent=`:root{--paper:#fbf8f0;--sand:#f1ede3;--sand2:#e9e4d8;--ink:#18233b;--muted:#58626a;--forest:#2f6565;--forest2:#18233b;--sage:#e3ecec;--gold:#3367a5;--line:#d8d6cf;--radius:14px;--shadow:0 18px 46px rgba(24,35,59,.09)}body{background:var(--paper);color:#20272d;line-height:1.65}::selection{background:#dbe7f3;color:#18233b}a:focus-visible,button:focus-visible{outline:3px solid #9cbce1;outline-offset:3px}h1,h2,h3{color:#18233b}.site-header{background:rgba(251,248,240,.96);border-bottom-color:#d8d6cf}.brand-mark,.button{background:#18233b;border-color:#18233b;border-radius:9px}.brand strong{color:#18233b}.nav-link:hover,.nav-link.active,.text-link{color:#3367a5}.button:hover{background:#10182b}.button-secondary{background:transparent;color:#18233b;border-color:#9aa5b5}.button-secondary:hover{background:#edf1f4}.section-tint{background:#f1ede3}.section-dark,.site-footer{background:#10182b}.eyebrow,.tag{color:#2f6565}.section-dark .eyebrow{color:#9dd0cc}.status-pill{background:#e5ecec;color:#204f50;border:1px solid #c5d7d6;border-radius:7px}.badge{border-radius:5px}.badge-policy{color:#365e86;background:#e7eef6}.badge-evidence,.badge-support{color:#2f6565;background:#e1eeee}.badge-hypothesis{color:#75561e;background:#f4ead2}.badge-review{color:#65557b;background:#eee9f5}.badge-cost,.badge-unknown{color:#85572f;background:#f4e8db}.hero-diagram{background:#10182b;border-radius:18px}.metric-grid{gap:0;border-block:1px solid #d8d6cf}.metric-card{border:0;border-right:1px solid #d8d6cf;border-radius:0;background:transparent}.metric-card:last-child{border-right:0}.card-grid,.status-board,.baseline-grid,.model-chain,.check-grid,.legend-grid{gap:1px;background:#d8d6cf;border:1px solid #d8d6cf;border-radius:14px;overflow:hidden}.feature-card,.panel,.status-board>div,.baseline-grid article,.model-chain article,.check-grid>div,.legend-grid>div{border:0;border-radius:0;background:#fbf8f0;box-shadow:none}.feature-card:hover{transform:none;box-shadow:none;background:#f6f7f5}.page-hero{background:linear-gradient(#fbf8f0,#f7f5ef)}.trace-head{background:#18233b}.timeline article:before{background:#3367a5}.change-grid article{border-top-color:#3367a5}.change-grid span{color:#3367a5}.system-schematic{display:grid;grid-template-columns:repeat(6,1fr);background:#d8d6cf;border:1px solid #d8d6cf;border-radius:14px;overflow:hidden}.system-schematic>div{background:#fbf8f0;padding:20px 16px;min-height:145px;margin-right:1px}.system-schematic>div:last-child{margin-right:0;background:#e9f0f3}.system-schematic b{display:block;color:#18233b;margin:16px 0 6px}.system-schematic small{color:#58626a}.system-schematic i{font-style:normal;color:#3367a5;font-size:.72rem;font-weight:900}.decision-flow{display:grid;grid-template-columns:repeat(7,1fr);border-block:1px solid #d8d6cf;margin-top:28px}.decision-flow div{position:relative;padding:18px 12px 18px 0;margin-right:20px}.decision-flow div:not(:last-child):after{content:"→";position:absolute;right:0;top:50%;color:#3367a5}.decision-flow b{display:block;color:#18233b;font-size:.86rem}.decision-flow small{color:#58626a}.geo-panel{display:grid;grid-template-columns:.8fr 1.2fr;gap:40px;align-items:center;padding:30px;border:1px solid #d8d6cf;border-radius:14px;background:linear-gradient(135deg,#f3f0e8,#edf2f3)}.catchment{min-height:280px;position:relative;border:1px solid #c8d0d6;border-radius:12px;background:#fbf8f0}.catchment:before,.catchment:after{content:"";position:absolute;border-radius:50%;border:1px dashed #8ca4b5;left:50%;top:50%;transform:translate(-50%,-50%)}.catchment:before{width:210px;height:210px}.catchment:after{width:120px;height:120px;border-color:#72a5a1}.dot{position:absolute;width:14px;height:14px;border-radius:50%;background:#18233b;box-shadow:0 0 0 5px rgba(24,35,59,.08)}.dot.phu{background:#2f6565}.dot.ref{background:#3367a5;width:18px;height:18px}.lab-note{font-size:.82rem;color:#58626a}.chip-grid a span{display:inline-block;padding:10px 13px;border:1px solid #d8d6cf;border-radius:999px;background:#fbf8f0;font-weight:650;font-size:.92rem}.chip-grid a:hover span{background:#edf1f4;border-color:#9aa5b5}@media(max-width:900px){.system-schematic{grid-template-columns:repeat(3,1fr)}.geo-panel{grid-template-columns:1fr}.decision-flow{grid-template-columns:repeat(4,1fr)}}@media(max-width:640px){.system-schematic,.decision-flow{grid-template-columns:1fr}.system-schematic>div{margin:0 0 1px;min-height:0}.decision-flow div{margin:0;border-bottom:1px solid #d8d6cf}.decision-flow div:not(:last-child):after{content:"↓";right:8px;top:auto;bottom:0}.metric-card{border-right:0!important;border-bottom:1px solid #d8d6cf}.metric-card:last-child{border-bottom:0}.catchment{min-height:250px}}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}`;
  document.head.appendChild(style);

  const theme=document.querySelector('meta[name="theme-color"]');
  if(theme)theme.content='#fbf8f0';

  document.title=document.title.replaceAll('Sierra Leone Health Systems','Sierra Leone Health Research');
  document.querySelectorAll('meta[property="og:title"],meta[property="og:description"],meta[name="description"]').forEach(el=>{
    if(el.content)el.content=el.content.replaceAll('Sierra Leone Health Systems','Sierra Leone Health Research');
  });

  const replacements=new Map([
    ['Sierra Leone Health Systems','Sierra Leone Health Research'],
    ['Research & Co-Design Phase','Independent Health-Systems Research'],
    ['Research & Co-Design','Research'],
    ['Build the Model With Us','Contribute to the Research'],
    ['Pilot Pathway','Research Agenda']
  ]);
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    let text=node.nodeValue;
    replacements.forEach((to,from)=>{text=text.replaceAll(from,to);});
    node.nodeValue=text;
  });

  document.querySelectorAll('.brand').forEach(a=>a.href=projectBase);
  document.querySelectorAll('.brand small').forEach(el=>el.textContent='Health Research');

  const nav=document.querySelector('#site-nav');
  if(nav){
    const p=location.pathname;
    const items=[
      ['Research',url('research/'),p.includes('/research/')&&!p.includes('/research/healthcare-that-works/')],
      ['Sierra Leone',url('sierra-leone/'),p.includes('/sierra-leone/')],
      ['Comparative Systems',url('research/healthcare-that-works/'),p.includes('/research/healthcare-that-works/')||p.includes('/research/models/')||p.includes('/research/compare/')],
      ['Evidence & Methods',url('evidence/'),p.includes('/evidence/')||p.includes('/about/methodology/')||p.includes('/about/corrections/')],
      ['Expert Review',url('participate/experts/'),p.includes('/participate/experts/')],
      ['About',url('about/'),p.endsWith('/about/')]
    ];
    nav.innerHTML=items.map(([label,href,active])=>`<a class="nav-link${active?' active':''}" href="${href}">${label}</a>`).join('');
  }

  document.querySelectorAll('.site-footer').forEach(footer=>{
    footer.innerHTML=`<div class="container footer-grid">
      <div><a class="brand footer-brand" href="${projectBase}"><span class="brand-mark" aria-hidden="true">SL</span><span><strong>Sierra Leone</strong><small>Health Research</small></span></a><p class="footer-boundary">Independent health-systems research and analysis. We do not provide medical care, operate healthcare facilities, manage referrals, enroll patients or represent the Government of Sierra Leone.</p></div>
      <div><p class="footer-title">Research</p><a href="${url('research/')}">Current Research</a><a href="${url('sierra-leone/')}">Sierra Leone</a><a href="${url('pilot-pathway/')}">Research Agenda</a></div>
      <div><p class="footer-title">Standards</p><a href="${url('about/methodology/')}">Methodology</a><a href="${url('about/corrections/')}">Corrections</a><a href="${url('evidence/')}">Evidence</a></div>
      <div><p class="footer-title">Contribute</p><a href="${url('participate/')}">Contribute to Research</a><a href="${url('participate/experts/')}">Expert Review Network</a><a href="${url('about/')}">About</a></div>
    </div><div class="container footer-bottom"><span>Independent Health-Systems Research</span><span>Build v0.5 · September 2026</span></div>`;
  });

  const menuButton=document.querySelector('.menu-button');
  const siteNav=document.querySelector('#site-nav');
  if(menuButton&&siteNav){menuButton.addEventListener('click',()=>{const open=siteNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});}

  const pageHero=document.querySelector('.page-hero');
  if(document.title.startsWith('Maternal Health Stress Test')&&pageHero&&!document.querySelector('.system-schematic')){
    const section=document.createElement('section');
    section.className='section border-top';
    section.innerHTML=`<div class="container"><p class="eyebrow">End-to-end research tracer</p><h2>One weak link can break the entire pathway.</h2><div class="system-schematic"><div><i>01</i><b>Pregnancy identified</b><small>Continuity starts early.</small></div><div><i>02</i><b>Antenatal continuity</b><small>Routine monitoring stays connected.</small></div><div><i>03</i><b>Risk recognized</b><small>Danger is identified before crisis.</small></div><div><i>04</i><b>Referral + transport</b><small>Escalation reaches a receiving facility.</small></div><div><i>05</i><b>Emergency capability</b><small>The receiving level can respond.</small></div><div><i>06</i><b>Return + follow-up</b><small>Mother and newborn return to accountable care.</small></div></div><p class="lab-note"><strong>Research boundary:</strong> this tracer studies system performance. It is not a clinical service or medical-advice pathway.</p></div>`;
    pageHero.after(section);
  }

  if(document.title.startsWith('Sierra Leone baseline')&&pageHero&&!document.querySelector('.geo-panel')){
    const section=document.createElement('section');
    section.className='section border-top';
    section.innerHTML=`<div class="container geo-panel"><div><p class="eyebrow">System geography</p><h2>Understand the system in space, not only on paper.</h2><p class="lead-sm">Verified maps can connect catchment responsibility, PHU access, referral distance and district structure.</p><p class="lab-note"><b>Boundary:</b> conceptual framework only. Real locations appear only when source data is verified.</p></div><div class="catchment" role="img" aria-label="Conceptual health-system geography"><span class="dot" style="left:20%;top:25%"></span><span class="dot" style="left:30%;top:70%"></span><span class="dot phu" style="left:50%;top:50%"></span><span class="dot" style="left:68%;top:28%"></span><span class="dot ref" style="left:80%;top:68%"></span></div></div>`;
    pageHero.after(section);
  }
})();