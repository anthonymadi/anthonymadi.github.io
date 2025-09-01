const projects = [
  {title:'Pins & Needles — Documentary', date:'30-Aug-2025', role:'Producer & Editor', url:'https://www.youtube.com/watch?v=ggh38hbBlpI'},
  {title:'Sunset Dance', date:'17-Jun-2025', role:'DOP & Editor', url:'https://www.youtube.com/watch?v=XRXnCK5tr3k'},
  {title:'Première de MDX Studios 2025', date:'30-Apr-2025', role:'Camera Operator', url:'https://www.youtube.com/watch?v=1DXleUvdN1s'},
  {title:'One Must Fall — Short Film', date:'15-Apr-2025', role:'Director', url:'https://www.youtube.com/watch?v=PUEyOgSyV9w'},
  {title:'Pamela Farhat — Amara Ya Amara [Music Video]', date:'19-Jul-2024', role:'DOP & Editor', url:'https://www.youtube.com/watch?v=VDfYpwlpFJc'},
  {title:'Marie Nassar — Edam El Kel & Yay Mashup [Music Video]', date:'04-Apr-2024', role:'DOP & Editor', url:'https://www.youtube.com/watch?v=_AhXEk1YmDc'},
  {title:'Fzero — Short Film', date:'05-Feb-2024', role:'One-man Crew', url:'https://www.youtube.com/watch?v=Fsav0nfuX60'},
  {title:'Golf GTI 2019 Commercial', date:'02-Jun-2023', role:'DOP & Editor', url:'https://www.youtube.com/watch?v=1X3PheqBEgk'},
  {title:'Fire Show', date:'12-Dec-2023', role:'DOP & Editor', url:'https://www.youtube.com/watch?v=I6uf1fLSCYs'},
  {title:'UAE National Anthem Cover', date:'02-Dec-2023', role:'DOP & Editor', url:'https://www.youtube.com/watch?v=ghtgcUPCD8o'},
  {title:'Istanbul Trip', date:'20-Sep-2023', role:'DOP & Editor', url:'https://www.youtube.com/watch?v=ZNKMCjPrR70'}
];

// Sort projects by date descending
projects.sort((a,b)=>new Date(b.date)-new Date(a.date));

// Populate carousel
const carousel = document.querySelector('.projects-carousel');
projects.forEach((p,i)=>{
  const div = document.createElement('div');
  div.className='video-item';
  div.dataset.index=i+1; // index 0 is showreel
  div.innerHTML=`<div class="video-thumbnail" style="background-image:url('https://img.youtube.com/vi/${p.url.split('v=')[1]}/hqdefault.jpg')">
                   <div class="play-button"></div>
                 </div>
                 <div class="video-info"><h3>${p.title}</h3><p>${p.date}<br>${p.role}</p></div>`;
  carousel.appendChild(div);
});

// DOP Showreel thumbnail (index 0)
const showreelThumb = document.querySelector('.showreel-thumb');
showreelThumb.dataset.index = 0;

// Combine DOP + Projects for lightbox
const allVideos = [
  {title:'DOP Showreel', url:'https://www.youtube.com/watch?v=SP8B-LFrXhU'},
  ...projects.map(p=>({title:p.title,url:p.url}))
];

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxIframe = document.getElementById('lightbox-iframe');
const lightboxClose = document.getElementById('lightbox-close');
const leftLightbox = document.querySelector('.left-lightbox');
const rightLightbox = document.querySelector('.right-lightbox');

let currentIndex = 0;

function openLightbox(index){
  currentIndex = index;
  lightbox.style.display='flex';
  lightboxIframe.src = allVideos[currentIndex].url.replace("watch?v=", "embed/")+'?autoplay=1';
}

function closeLightbox(){
  lightbox.style.display='none';
  lightboxIframe.src='';
}

function showNext(){
  currentIndex=(currentIndex+1)%allVideos.length;
  lightboxIframe.src = allVideos[currentIndex].url.replace("watch?v=", "embed/")+'?autoplay=1';
}

function showPrev(){
  currentIndex=(currentIndex-1+allVideos.length)%allVideos.length;
  lightboxIframe.src = allVideos[currentIndex].url.replace("watch?v=", "embed/")+'?autoplay=1';
}

// Open lightbox on thumbnail click
document.querySelectorAll('.video-thumbnail').forEach(thumb=>{
  thumb.addEventListener('click', ()=>openLightbox(parseInt(thumb.dataset.index)));
});

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e=>{
  if(e.target === lightbox) closeLightbox();
});

// Lightbox arrows
leftLightbox.addEventListener('click', showPrev);
rightLightbox.addEventListener('click', showNext);

// Carousel arrows
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

function getVisibleCount(){
  const item = document.querySelector('.video-item');
  if(!item) return 1;
  return Math.floor(carousel.offsetWidth / item.offsetWidth);
}

leftArrow.addEventListener('click', ()=>{
  const step = getVisibleCount();
  carousel.scrollBy({left:-step*320, behavior:'smooth'});
});

rightArrow.addEventListener('click', ()=>{
  const step = getVisibleCount();
  carousel.scrollBy({left:step*320, behavior:'smooth'});
});

// Phone copy
const phone = document.querySelector('.phone-number');
const notif = document.getElementById('copy-notif');

phone.addEventListener('click', ()=>{
  navigator.clipboard.writeText(phone.textContent);
  notif.style.opacity='1';
  setTimeout(()=>{notif.style.opacity='0'},800);
});
