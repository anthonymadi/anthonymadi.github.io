const projects = [
  { title: "Pins & Needles — Documentary", date: "30-Aug-2025", role:"Producer & Editor", video:"ggh38hbBlpI" },
  { title: "Sunset Dance", date:"17-Jun-2025", role:"DOP & Editor", video:"XRXnCK5tr3k" },
  { title: "Première de MDX Studios 2025", date:"30-Apr-2025", role:"Camera Operator", video:"1DXleUvdN1s" },
  { title: "One Must Fall — Short Film", date:"15-Apr-2025", role:"Director", video:"PUEyOgSyV9w" },
  { title: "Pamela Farhat — Amara Ya Amara [Music Video]", date:"19-Jul-2024", role:"DOP & Editor", video:"VDfYpwlpFJc" },
  { title: "Marie Nassar — Edam El Kel & Yay Mashup [Music Video]", date:"04-Apr-2024", role:"DOP & Editor", video:"_AhXEk1YmDc" },
  { title: "Fzero — Short Film", date:"05-Feb-2024", role:"One-man Crew", video:"Fsav0nfuX60" },
  { title: "Fire Show", date:"12-Dec-2023", role:"DOP & Editor", video:"I6uf1fLSCYs" },
  { title: "UAE National Anthem Cover", date:"02-Dec-2023", role:"DOP & Editor", video:"ghtgcUPCD8o" },
  { title: "Istanbul Trip", date:"20-Sep-2023", role:"DOP & Editor", video:"ZNKMCjPrR70" },
  { title: "Golf GTI 2019 Commercial", date:"02-Jun-2023", role:"DOP & Editor", video:"1X3PheqBEgk" }
];

const carousel = document.querySelector('.projects-carousel');

// Sort by date descending
projects.sort((a,b)=>new Date(b.date) - new Date(a.date));

// Insert projects into carousel
projects.forEach(p=>{
  const div=document.createElement('div');
  div.className='video-item';
  div.innerHTML=`
    <div class="video-thumbnail" data-video-id="${p.video}" style="background-image:url('https://img.youtube.com/vi/${p.video}/hqdefault.jpg')">
      <div class="play-button"></div>
    </div>
    <div class="video-info">
      <h3>${p.title}</h3>
      <p>Date: ${p.date}</p>
      <p>${p.role}</p>
    </div>`;
  carousel.appendChild(div);
});

// CAROUSEL SCROLL
const leftArrow=document.querySelector('.left-arrow');
const rightArrow=document.querySelector('.right-arrow');

function updateArrows(){
  leftArrow.style.display=carousel.scrollLeft>0?'flex':'none';
  rightArrow.style.display=carousel.scrollLeft+carousel.clientWidth<carousel.scrollWidth?'flex':'none';
}
updateArrows();

leftArrow.addEventListener('click',()=>{
  const visible=Math.floor(carousel.clientWidth / carousel.children[0].clientWidth);
  carousel.scrollBy({ left: -visible*carousel.children[0].clientWidth, behavior: 'smooth' });
});
rightArrow.addEventListener('click',()=>{
  const visible=Math.floor(carousel.clientWidth / carousel.children[0].clientWidth);
  carousel.scrollBy({ left: visible*carousel.children[0].clientWidth, behavior: 'smooth' });
});
carousel.addEventListener('scroll', updateArrows);

// LIGHTBOX
const lightbox=document.getElementById('lightbox');
const iframe=document.getElementById('lightbox-iframe');
const lightboxClose=document.getElementById('lightbox-close');
const lightLeft=document.querySelector('.left-lightbox');
const lightRight=document.querySelector('.right-lightbox');

let currentIndex=-1;

function openLightbox(index){
  currentIndex=index;
  iframe.src=`https://www.youtube.com/embed/${projects[index].video}?autoplay=1`;
  lightbox.style.display='flex';
}
function closeLightbox(){ iframe.src=''; lightbox.style.display='none'; }
lightboxClose.addEventListener('click', closeLightbox);

carousel.querySelectorAll('.video-thumbnail').forEach((thumb,i)=>{
  thumb.addEventListener('click',()=>openLightbox(i));
});
document.querySelector('.showreel-thumb').addEventListener('click',()=>{ openLightbox(0); });

// Lightbox arrows
lightLeft.addEventListener('click',()=>{
  currentIndex=(currentIndex-1+projects.length)%projects.length;
  iframe.src=`https://www.youtube.com/embed/${projects[currentIndex].video}?autoplay=1`;
});
lightRight.addEventListener('click',()=>{
  currentIndex=(currentIndex+1)%projects.length;
  iframe.src=`https://www.youtube.com/embed/${projects[currentIndex].video}?autoplay=1`;
});

// PHONE COPY
const phoneSpan=document.querySelector('.phone-number');
const copyNotif=document.getElementById('copy-notif');
phoneSpan.addEventListener('click',()=>{
  navigator.clipboard.writeText(phoneSpan.textContent);
  copyNotif.style.opacity=1;
  setTimeout(()=>copyNotif.style.opacity=0,1000);
});
