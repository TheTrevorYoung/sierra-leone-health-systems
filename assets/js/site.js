const menuButton=document.querySelector('.menu-button');
const siteNav=document.querySelector('#site-nav');
if(menuButton&&siteNav){
  menuButton.addEventListener('click',()=>{
    const open=siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
  });
}

(()=>{
  const theme=document.querySelector('meta[name="theme-color"]');
  if(theme)theme.content='#fbf8f0';

  document.querySelectorAll('.footer-bottom span:last-child').forEach(el=>{
    if(el.textContent.includes('Build v0.'))el.textContent='Build v0.8 · September 2026';
  });

  const commonsFile=(name)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(name)}`;
  const commonsPage=(name)=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(name.replaceAll(' ','_'))}`;

  const media={
    slCommunity:{file:'Sierra Leone Ebola Recovery, Community Engagment and Health Posts (25701800671).jpg',alt:'Community health activity in Sierra Leone',credit:'Sierra Leone community health context, USAID, public domain'},
    slCommunity2:{file:'Sierra Leone Ebola Recovery, Community Engagment and Health Posts (25675908562).jpg',alt:'Community engagement and health post recovery activity in Sierra Leone',credit:'Community health context, USAID, public domain'},
    slCommunity3:{file:'Sierra Leone Ebola Recovery, Community Engagment and Health Posts (25166400344).jpg',alt:'Community health and Ebola recovery activity in Sierra Leone',credit:'Sierra Leone field context, USAID, public domain'},
    slCommunity4:{file:'Sierra Leone Ebola Recovery, Community Engagment and Health Posts (25496206410).jpg',alt:'People participating in Ebola recovery and community health activity in Sierra Leone',credit:'Sierra Leone recovery context, USAID/Alicia Clark, public domain'},
    slCommunity5:{file:'Sierra Leone Ebola Recovery, Community Engagment and Health Posts (25770814526).jpg',alt:'Community health and recovery activity in Sierra Leone',credit:'Sierra Leone field context, USAID/Alicia Clark, public domain'},
    slNurse:{file:'Nurse at Koidu Hospital Sierra Leone.jpg',alt:'Nurse consulting with patients at Koidu Hospital in Sierra Leone',credit:'Koidu Hospital, USAID, public domain'},
    slHospital:{file:'Kailahun Government Hospital.jpg',alt:'Kailahun Government Hospital in Sierra Leone',credit:'Kailahun Government Hospital, USAID, public domain'},
    slAmbulance:{file:'Sierra Leone Ambulance.jpg',alt:'Ambulance outside Koidu Hospital in Sierra Leone',credit:'Referral transport context, USAID, public domain'},
    slMaternal:{file:'Maternal health (4798750001).jpg',alt:'Mother and baby waiting for healthcare in Sierra Leone',credit:'Robert Yates / DFID, CC BY 2.0'},
    slRural:{file:'Rural health care (8329317253).jpg',alt:'Health promoters using bicycles to reach remote communities in Sierra Leone',credit:'USAID/P. Nshimirimana, public domain'},
    slChild:{file:'Child at Koidu Hospital Sierra Leone 2019.png',alt:'Child and adults at Koidu Government Hospital in Sierra Leone',credit:'John Green / vlogbrothers, CC BY 3.0'},
    slBaby:{file:'Baby unit of Koidu Government Hospital Sierra Leone 01.png',alt:'Special Care Baby Unit at Koidu Government Hospital in Sierra Leone',credit:'vlogbrothers, CC BY 3.0'},
    slRoad:{file:'Sierra Leone Kailahun road.jpg',alt:'Rural road in Kailahun District, Sierra Leone',credit:'USAID, public domain'},

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

  // Automatic galleries are intentionally limited. Pages with strong manual photography
  // or image-led country cards do not receive another repeated gallery.
  const galleries={
    '/research/models/cuba':{title:'Primary care in Cuba',items:[media.cubaClinic,media.cubaNurse]},
    '/research/models/rwanda':{title:'Community care in Rwanda',items:[media.rwandaCommunity,media.rwandaClinic]},
    '/research/models/costa-rica':{title:'Primary care in Costa Rica',items:[media.costaEbais,media.costaNursing]},
    '/research/models/portugal':{title:'Primary care in Portugal',items:[media.portugalUsf,media.portugalClinic]},
    '/research/models/thailand':{title:'Community care in Thailand',items:[media.thailandRural,media.thailandVolunteers]},
    '/model/financing':{title:'Access has a geography and a cost',items:[media.slRoad,media.slCommunity4]},
    '/model/change-log':{title:'Research grounded in place',items:[media.slCommunity5,media.slChild]},
    '/pilot-pathway':{title:'From evidence to practical use',items:[media.slCommunity2]},
    '/participate/experts':{title:'Expertise connected to context',items:[media.slCommunity3,media.slChild]},
    '/about/methodology':{title:'Research grounded in real systems',items:[media.slCommunity4,media.slRural]},
    '/evidence':{title:'Evidence connected to the real system',items:[media.slCommunity5]}
  };

  const config=galleries[normalized];
  if(config&&!document.querySelector('.auto-visual-gallery')){
    const section=document.createElement('section');
    section.className='visual-gallery-section auto-visual-gallery';
    const count=config.items.length;
    const figures=config.items.map((item,index)=>`<figure${index===0&&count===3?' class="tall"':''}><img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async"><figcaption>${item.credit} · <a href="${item.source}" target="_blank" rel="noopener noreferrer">source</a></figcaption></figure>`).join('');
    section.innerHTML=`<div class="container"><div class="visual-gallery-header"><div><p class="eyebrow">Visual context</p><h2>${config.title}</h2></div></div><div class="visual-gallery count-${count}">${figures}</div></div>`;
    const anchor=document.querySelector('.media-hero,.page-hero');
    if(anchor)anchor.after(section);else document.querySelector('main')?.prepend(section);
  }
})();
