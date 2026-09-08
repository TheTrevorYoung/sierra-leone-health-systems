const menuButton=document.querySelector('.menu-button');
const siteNav=document.querySelector('#site-nav');
if(menuButton&&siteNav){
  menuButton.addEventListener('click',()=>{
    const open=siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
  });
}

(()=>{
  const currentScript=document.currentScript||document.querySelector('script[src*="assets/js/site.js"]');
  if(currentScript&&!document.querySelector('link[data-academic-layer]')){
    const academic=document.createElement('link');
    academic.rel='stylesheet';
    academic.href=new URL('../css/academic-minimal.css?v=0.9',currentScript.src).href;
    academic.dataset.academicLayer='true';
    document.head.appendChild(academic);
  }

  document.querySelectorAll('.footer-bottom span:last-child').forEach(el=>{
    if(el.textContent.includes('Build v0.'))el.textContent='Build v0.9 · September 2026';
  });

  document.querySelectorAll('.site-nav a,.site-footer a').forEach(link=>{
    if(link.textContent.trim()==='Collaborate')link.textContent='Contribute';
  });

  const commonsFile=(name)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(name)}`;
  const commonsPage=(name)=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name.replaceAll(' ','_'))}`;

  const media={
    cubaClinic:{file:'Policlínico.jpg',alt:'Primary care polyclinic in Cuba',credit:'Cuban Boy, Wikimedia Commons, CC0'},
    cubaNurse:{file:'Nurse in Pinar del Rio - Cuba 01.JPG',alt:'Nurse in Pinar del Rio, Cuba',credit:'Adam Jones, Wikimedia Commons, see source for license'},
    rwandaCommunity:{file:'080Rwanda 0609 BCampbell 21.jpg',alt:'Community health work in Rwanda',credit:'Wikimedia Commons, see source for license'},
    rwandaClinic:{file:'Gikondo health center.jpg',alt:'Gikondo health center in Rwanda',credit:'Jacques NIYIGENA, Wikimedia Commons, CC BY-SA 4.0'},
    costaEbais:{file:'EBAIS.CostaRica.JPG',alt:'EBAIS primary healthcare facility in Costa Rica',credit:'Rodtico21, Wikimedia Commons, CC BY-SA 3.0'},
    costaNursing:{file:'EBAIS.Enfermeria.CostaRica.JPG',alt:'Nursing area in a Costa Rican EBAIS primary care facility',credit:'Rodtico21, Wikimedia Commons, CC BY-SA 3.0'},
    portugalUsf:{file:'Unidade de Saúde Familiar Luisa Todi, Setúbal 03.jpg',alt:'Family Health Unit in Setúbal, Portugal',credit:'GualdimG, Wikimedia Commons, CC BY-SA 4.0'},
    portugalClinic:{file:'Centro de Saude de Aljezur - 14.03.2020.jpg',alt:'Primary health center in Aljezur, Portugal',credit:'Bextrel, Wikimedia Commons, CC BY-SA 4.0'},
    thailandRural:{file:'Rural Health in Thailand.jpg',alt:'Rural health setting in Thailand',credit:'The Wandering Angel, Wikimedia Commons, CC BY 2.0'},
    thailandVolunteers:{file:'VillagehealthvolunteersfromLAWAproject.jpg',alt:'Village health volunteers in Thailand',credit:'Wikimedia Commons, see source for license'}
  };

  Object.values(media).forEach(item=>{
    item.src=commonsFile(item.file);
    item.source=commonsPage(item.file);
  });

  const countryMap={
    cuba:media.cubaClinic,
    rwanda:media.rwandaCommunity,
    'costa-rica':media.costaEbais,
    portugal:media.portugalUsf,
    thailand:media.thailandRural
  };

  document.querySelectorAll('a.feature-card[href*="models/"]').forEach(card=>{
    const href=card.getAttribute('href')||'';
    const key=Object.keys(countryMap).find(k=>href.includes(`models/${k}`));
    if(!key||card.querySelector('.country-card-photo'))return;
    const item=countryMap[key];
    const photo=document.createElement('div');
    photo.className='country-card-photo';
    photo.innerHTML=`<img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async"><small>${item.credit} · <a href="${item.source}" target="_blank" rel="noopener noreferrer">source</a></small>`;
    card.prepend(photo);
  });

  const parts=location.pathname.split('/').filter(Boolean);
  if(parts[0]==='sierra-leone-health-systems')parts.shift();
  const route='/' + parts.join('/');
  const normalized=route==='/'?'/':route.replace(/\/$/,'');

  // Automatic galleries are reserved for country research pages only.
  // Other pages should earn their visuals through the page content rather than decoration.
  const galleries={
    '/research/models/cuba':{title:'Primary care in Cuba',items:[media.cubaClinic,media.cubaNurse]},
    '/research/models/rwanda':{title:'Community care in Rwanda',items:[media.rwandaCommunity,media.rwandaClinic]},
    '/research/models/costa-rica':{title:'Primary care in Costa Rica',items:[media.costaEbais,media.costaNursing]},
    '/research/models/portugal':{title:'Primary care in Portugal',items:[media.portugalUsf,media.portugalClinic]},
    '/research/models/thailand':{title:'Community care in Thailand',items:[media.thailandRural,media.thailandVolunteers]}
  };

  const config=galleries[normalized];
  if(config&&!document.querySelector('.auto-visual-gallery')){
    const section=document.createElement('section');
    section.className='visual-gallery-section auto-visual-gallery';
    const figures=config.items.map(item=>`<figure><img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async"><figcaption>${item.credit} · <a href="${item.source}" target="_blank" rel="noopener noreferrer">source</a></figcaption></figure>`).join('');
    section.innerHTML=`<div class="container"><div class="visual-gallery-header"><div><p class="eyebrow">Visual context</p><h2>${config.title}</h2></div></div><div class="visual-gallery count-2">${figures}</div></div>`;
    const anchor=document.querySelector('.media-hero,.page-hero');
    if(anchor)anchor.after(section);
  }
})();
