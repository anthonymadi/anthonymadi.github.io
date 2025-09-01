const projects = [
  { title: "DOP Showreel", url: "https://www.youtube.com/embed/YOUR_SHOWREEL_VIDEO_ID" },
  { title: "Pins & Needles — Documentary", url: "https://www.youtube.com/embed/ggh38hbBlpI" },
  { title: "Sunset Dance", url: "https://www.youtube.com/embed/XRXnCK5tr3k" },
  // Add remaining projects here in correct sorted order
];

const thumbnails = document.querySelectorAll(".video-thumbnail");
const lightbox = document.getElementById("lightbox");
const iframe = document.getElementById("lightbox-iframe");
const closeLightbox = document.getElementById("close-lightbox");
const leftLightbox = document.getElementById("lightbox-left");
const rightLightbox = document.getElementById("lightbox-right");

let currentIndex = 0;

// Open lightbox when clicking a thumbnail
thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    currentIndex = parseInt(thumb.dataset.index);
    openLightbox(currentIndex);
  });
});

function openLightbox(index) {
  iframe.src = projects[index].url + "?autoplay=1";
  lightbox.style.display = "flex";
  updateLightboxArrows();
}

// Close lightbox
closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
  iframe.src = "";
});

// Click outside to close
lightbox.addEventListener("click", e => {
  if(e.target === lightbox) {
    lightbox.style.display = "none";
    iframe.src = "";
  }
});

// Lightbox arrows
leftLightbox.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  iframe.src = projects[currentIndex].url + "?autoplay=1";
});

rightLightbox.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % projects.length;
  iframe.src = projects[currentIndex].url + "?autoplay=1";
});

function updateLightboxArrows() {
  leftLightbox.style.display = projects.length > 1 ? "flex" : "none";
  rightLightbox.style.display = projects.length > 1 ? "flex" : "none";
}

// Phone number copy
const phoneNumber = document.getElementById("phone-number");
const copyNotification = document.getElementById("copy-notification");

phoneNumber.addEventListener("click", () => {
  navigator.clipboard.writeText(phoneNumber.textContent.trim());
  copyNotification.style.opacity = 1;
  setTimeout(() => { copyNotification.style.opacity = 0; }, 1200);
});

// Projects carousel scroll
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const carousel = document.getElementById("projects-carousel");

function updateCarouselArrows() {
  leftArrow.style.display = carousel.scrollLeft > 0 ? "flex" : "none";
  rightArrow.style.display = carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth ? "flex" : "none";
}

leftArrow.addEventListener("click", () => {
  const visible = Math.floor(carousel.clientWidth / carousel.children[0].clientWidth);
  carousel.scrollBy({ left: -visible * carousel.children[0].clientWidth, behavior: "smooth" });
  setTimeout(updateCarouselArrows, 200);
});

rightArrow.addEventListener("click", () => {
  const visible = Math.floor(carousel.clientWidth / carousel.children[0].clientWidth);
  carousel.scrollBy({ left: visible * carousel.children[0].clientWidth, behavior: "smooth" });
  setTimeout(updateCarouselArrows, 200);
});

carousel.addEventListener("scroll", updateCarouselArrows);
updateCarouselArrows();
