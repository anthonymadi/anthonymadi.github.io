// ---------- Projects Data ----------
const projects = [
  {
    title: "Pins & Needles — Documentary",
    date: "30-Aug-2025",
    role: "Producer & Editor",
    url: "https://www.youtube.com/embed/ggh38hbBlpI",
  },
  {
    title: "Sunset Dance",
    date: "17-Jun-2025",
    role: "DOP & Editor",
    url: "https://www.youtube.com/embed/XRXnCK5tr3k",
  },
  {
    title: "Première de MDX Studios 2025",
    date: "30-Apr-2025",
    role: "Camera Operator",
    url: "https://www.youtube.com/embed/1DXleUvdN1s",
  },
  {
    title: "One Must Fall — Short Film",
    date: "15-Apr-2025",
    role: "Director",
    url: "https://www.youtube.com/embed/PUEyOgSyV9w",
  },
  {
    title: "Pamela Farhat — Amara Ya Amara [Music Video]",
    date: "19-Jul-2024",
    role: "DOP & Editor",
    url: "https://www.youtube.com/embed/VDfYpwlpFJc",
  },
  {
    title: "Marie Nassar — Edam El Kel & Yay Mashup [Music Video]",
    date: "04-Apr-2024",
    role: "DOP & Editor",
    url: "https://www.youtube.com/embed/_AhXEk1YmDc",
  },
  {
    title: "Fzero — Short Film",
    date: "05-Feb-2024",
    role: "One-man Crew",
    url: "https://www.youtube.com/embed/Fsav0nfuX60",
  },
  {
    title: "Fire Show",
    date: "12-Dec-2023",
    role: "DOP & Editor",
    url: "https://www.youtube.com/embed/I6uf1fLSCYs",
  },
  {
    title: "UAE National Anthem Cover",
    date: "02-Dec-2023",
    role: "DOP & Editor",
    url: "https://www.youtube.com/embed/ghtgcUPCD8o",
  },
  {
    title: "Istanbul Trip",
    date: "20-Sep-2023",
    role: "DOP & Editor",
    url: "https://www.youtube.com/embed/ZNKMCjPrR70",
  },
  {
    title: "Golf GTI 2019 Commercial",
    date: "02-Jun-2023",
    role: "DOP & Editor",
    url: "https://www.youtube.com/embed/1X3PheqBEgk",
  }
];

// ---------- DOM References ----------
const dopThumbnail = document.querySelector(".showreel-thumb");
const dopIframe = document.querySelector("#dop-iframe");
const lightbox = document.querySelector(".lightbox");
const lightboxIframe = document.querySelector("#lightbox-iframe");
const closeLightbox = document.querySelector(".close-lightbox");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const leftLightbox = document.querySelector(".left-lightbox");
const rightLightbox = document.querySelector(".right-lightbox");
const carousel = document.querySelector(".projects-carousel");
const phone = document.querySelector(".phone-number");
const copyNotification = document.querySelector(".copy-notification");

// ---------- DOP Showreel ----------
dopThumbnail.addEventListener("click", () => {
  // ensure the correct DOP showreel URL
  dopIframe.src = "https://www.youtube.com/embed/XRXnCK5tr3k?autoplay=1";
  lightbox.style.display = "flex";
  lightboxIframe.src = "https://www.youtube.com/embed/XRXnCK5tr3k?autoplay=1";
  currentIndex = 1; // DOP showreel index
  updateLightboxArrows();
});

// ---------- Projects Thumbnails ----------
const projectThumbnails = document.querySelectorAll(".video-thumbnail[data-index]");
projectThumbnails.forEach(thumbnail => {
  thumbnail.addEventListener("click", () => {
    const index = parseInt(thumbnail.getAttribute("data-index"));
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxIframe.src = projects[index].url + "?autoplay=1";
    updateLightboxArrows();
  });
});

// ---------- Lightbox ----------
closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  lightboxIframe.src = "";
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    lightboxIframe.src = "";
  }
});

// ---------- Carousel Arrows ----------
function scrollCarousel(amount) {
  const visible = Math.floor(carousel.offsetWidth / projectThumbnails[0].offsetWidth);
  carousel.scrollBy({ left: amount * projectThumbnails[0].offsetWidth * visible, behavior: "smooth" });
}

leftArrow.addEventListener("click", () => scrollCarousel(-1));
rightArrow.addEventListener("click", () => scrollCarousel(1));

// ---------- Lightbox Arrows ----------
let currentIndex = 0;

function updateLightboxArrows() {
  leftLightbox.style.display = currentIndex > 0 ? "flex" : "none";
  rightLightbox.style.display = currentIndex < projects.length - 1 ? "flex" : "none";
}

leftLightbox.addEventListener("click", () => {
  if (currentIndex > 0) currentIndex--;
  lightboxIframe.src = projects[currentIndex].url + "?autoplay=1";
  updateLightboxArrows();
});

rightLightbox.addEventListener("click", () => {
  if (currentIndex < projects.length - 1) currentIndex++;
  lightboxIframe.src = projects[currentIndex].url + "?autoplay=1";
  updateLightboxArrows();
});

// ---------- Phone Copy ----------
phone.addEventListener("click", () => {
  navigator.clipboard.writeText(phone.textContent).then(() => {
    copyNotification.style.opacity = 1;
    setTimeout(() => copyNotification.style.opacity = 0, 1200);
  });
});

// ---------- Initialize ----------
updateLightboxArrows();
