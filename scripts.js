const videos = [
  "https://www.youtube.com/embed/SHOWREEL_VIDEO_ID",
  "https://www.youtube.com/embed/XRXnCK5tr3k",
  "https://www.youtube.com/embed/1DXleUvdN1s",
  "https://www.youtube.com/embed/PUEyOgSyV9w",
  "https://www.youtube.com/embed/_AhXEk1YmDc",
  "https://www.youtube.com/embed/VDfYpwlpFJc",
  "https://www.youtube.com/embed/Fsav0nfuX60",
  "https://www.youtube.com/embed/I6uf1fLSCYs",
  "https://www.youtube.com/embed/ghtgcUPCD8o",
  "https://www.youtube.com/embed/ZNKMCjPrR70",
  "https://www.youtube.com/embed/1X3PheqBEgk"
];

const carousel = document.getElementById("carousel");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const thumbnails = document.querySelectorAll(".video-thumbnail");
const lightbox = document.getElementById("lightbox");
const lightboxIframe = document.getElementById("lightbox-iframe");
const closeLightbox = document.getElementById("close-lightbox");
const leftLightbox = document.querySelector(".left-lightbox");
const rightLightbox = document.querySelector(".right-lightbox");
const phoneNumber = document.getElementById("phone-number");
const copyNotif = document.getElementById("copy-notif");

// Generate project items dynamically
const projectData = [
  {title:"Pins & Needles — Documentary", date:"30-Aug-2025", role:"Producer & Editor", link:"https://www.youtube.com/embed/ggh38hbBlpI"},
  {title:"Sunset Dance", date:"17-Jun-2025", role:"DOP & Editor", link:"https://www.youtube.com/embed/XRXnCK5tr3k"},
  {title:"Première de MDX Studios 2025", date:"30-Apr-2025", role:"Camera Operator", link:"https://www.youtube.com/embed/1DXleUvdN1s"},
  {title:"One Must Fall — Short Film", date:"15-Apr-2025", role:"Director", link:"https://www.youtube.com/embed/PUEyOgSyV9w"},
  {title:"Marie Nassar — Edam El Kel & Yay Mashup [Music Video]", date:"04-Apr-2024", role:"DOP & Editor", link:"https://www.youtube.com/embed/_AhXEk1YmDc"},
  {title:"Pamela Farhat — Amara Ya Amara [Music Video]", date:"19-Jul-2024", role:"DOP & Editor", link:"https://www.youtube.com/embed/VDfYpwlpFJc"},
  {title:"Fzero — Short Film", date:"05-Feb-2024", role:"One-man Crew", link:"https://www.youtube.com/embed/Fsav0nfuX60"},
  {title:"Fire Show", date:"12-Dec-2023", role:"DOP & Editor", link:"https://www.youtube.com/embed/I6uf1fLSCYs"},
  {title:"UAE National Anthem Cover", date:"02-Dec-2023", role:"DOP & Editor", link:"https://www.youtube.com/embed/ghtgcUPCD8o"},
  {title:"Istanbul Trip", date:"20-Sep-2023", role:"DOP & Editor", link:"https://www.youtube.com/embed/ZNKMCjPrR70"},
  {title:"Golf GTI 2019 Commercial", date:"02-Jun-2023", role:"DOP & Editor", link:"https://www.youtube.com/embed/1X3PheqBEgk"}
];

projectData.forEach((p, i)=>{
  const div = document.createElement("div");
  div.className = "video-item";
  div.innerHTML = `<div class="video-thumbnail" data-index="${i}" style="background-image:url('thumbnail${i}.jpg');"><div class="play-button"></div></div>
                   <div class="video-info"><h3>${p.title}</h3><p>${p.date} | ${p.role}</p></div>`;
  carousel.appendChild(div);
});

// -------- Carousel Scroll --------
function updateCarouselArrows() {
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  leftArrow.style.display = carousel.scrollLeft > 0 ? "flex" : "none";
  rightArrow.style.display = carousel.scrollLeft < maxScroll ? "flex" : "none";
}

function getVisibleCount() {
  const carouselWidth = carousel.clientWidth;
  let totalWidth = 0;
  let count = 0;
  for (let item of carousel.children) {
    totalWidth += item.offsetWidth + parseInt(getComputedStyle(item).gap) || 0;
    if (totalWidth <= carouselWidth) count++;
    else break;
  }
  return count || 1;
}

leftArrow.addEventListener("click", () => {
  const visible = getVisibleCount();
  const scrollAmount = Array.from(carousel.children).slice(0, visible).reduce((sum, el) => sum + el.offset
