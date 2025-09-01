// Array of project YouTube links
const videos = [
  "https://www.youtube.com/embed/ggh38hbBlpI",
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

let currentIndex = 0;

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
  const scrollAmount = Array.from(carousel.children).slice(0, visible).reduce((sum, el) => sum + el.offsetWidth + parseInt(getComputedStyle(el).gap || 0), 0);
  carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

rightArrow.addEventListener("click", () => {
  const visible = getVisibleCount();
  const scrollAmount = Array.from(carousel.children).slice(0, visible).reduce((sum, el) => sum + el.offsetWidth + parseInt(getComputedStyle(el).gap || 0), 0);
  carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

carousel.addEventListener("scroll", updateCarouselArrows);
window.addEventListener("load", updateCarouselArrows);
window.addEventListener("resize", updateCarouselArrows);

// -------- Lightbox --------
function openLightbox(index) {
  currentIndex = index;
  lightboxIframe.src = videos[currentIndex];
  lightbox.style.display = "flex";
}

function closeLightboxFunc() {
  lightbox.style.display = "none";
  lightboxIframe.src = "";
}

function prevVideo() {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  lightboxIframe.src = videos[currentIndex];
}

function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  lightboxIframe.src = videos[currentIndex];
}

thumbnails.forEach((thumb, i) => {
  thumb.addEventListener("click", () => openLightbox(parseInt(thumb.dataset.index)));
});

closeLightbox.addEventListener("click", closeLightboxFunc);
leftLightbox.addEventListener("click", prevVideo);
rightLightbox.addEventListener("click", nextVideo);

// Close lightbox on overlay click (optional)
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightboxFunc();
});

// -------- Phone Copy --------
phoneNumber.addEventListener("click", () => {
  navigator.clipboard.writeText(phoneNumber.textContent).then(() => {
    copyNotif.style.opacity = 1;
    setTimeout(() => { copyNotif.style.opacity = 0; }, 1200);
  });
});
