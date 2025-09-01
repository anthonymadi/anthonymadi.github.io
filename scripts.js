/* ---------- Select elements ---------- */
const thumbnails = document.querySelectorAll('.video-thumbnail');
const lightbox = document.querySelector('.lightbox');
const iframe = document.getElementById('lightbox-iframe');
const closeBtn = lightbox.querySelector('.close-lightbox');
const leftLightbox = lightbox.querySelector('.left-lightbox');
const rightLightbox = lightbox.querySelector('.right-lightbox');
const carousel = document.querySelector('.projects-carousel');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const phoneNumber = document.querySelector('.phone-number');
const copyNotification = document.getElementById('copyNotification');

/* ---------- Helper: current open video ---------- */
let currentIndex = 0;
let videoItems = Array.from(document.querySelectorAll('.projects-carousel .video-item'));

/* ---------- Open lightbox ---------- */
function openLightbox(index) {
  currentIndex = index;
  const id = videoItems[currentIndex].querySelector('.video-thumbnail').dataset.videoId;
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  lightbox.style.display = 'flex';
  lightbox.setAttribute('aria-hidden', 'false');
}

/* ---------- Close lightbox ---------- */
function closeLightbox() {
  iframe.src = '';
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
}

/* ---------- Open thumbnail click ---------- */
thumbnails.forEach((thumb, i) => {
  thumb.addEventListener('click', () => openLightbox(videoItems.indexOf(thumb.closest('.video-item'))));
  thumb.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(videoItems.indexOf(thumb.closest('.video-item')));
    }
  });
});

/* ---------- Lightbox navigation ---------- */
function navigateLightbox(step) {
  currentIndex += step;
  if (currentIndex < 0) currentIndex = videoItems.length - 1;
  if (currentIndex >= videoItems.length) currentIndex = 0;
  const id = videoItems[currentIndex].querySelector('.video-thumbnail').dataset.videoId;
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}

leftLightbox.addEventListener('click', () => navigateLightbox(-1));
rightLightbox.addEventListener('click', () => navigateLightbox(1));

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ---------- Main carousel scroll ---------- */
function updateCarouselArrows() {
  leftArrow.style.display = carousel.scrollLeft > 0 ? 'flex' : 'none';
  rightArrow.style.display = carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1 ? 'flex' : 'none';
}

function visibleVideos() {
  let count = 0;
  const carouselRect = carousel.getBoundingClientRect();
  videoItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.left >= carouselRect.left && rect.right <= carouselRect.right) count++;
  });
  return count || 1;
}

function scrollCarousel(step) {
  const scrollCount = visibleVideos() * step;
  const itemWidth = videoItems[0].offsetWidth + parseInt(getComputedStyle(videoItems[0]).gap || 20);
  carousel.scrollBy({ left: itemWidth * scrollCount, behavior: 'smooth' });
}

leftArrow.addEventListener('click', () => { scrollCarousel(-1); setTimeout(updateCarouselArrows, 300); });
rightArrow.addEventListener('click', () => { scrollCarousel(1); setTimeout(updateCarouselArrows, 300); });
carousel.addEventListener('scroll', updateCarouselArrows);
window.addEventListener('resize', updateCarouselArrows);
updateCarouselArrows();

/* ---------- Smooth scroll for nav ---------- */
document.querySelectorAll('nav.main-nav a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- Phone number copy ---------- */
phoneNumber.addEventListener('click', () => {
  navigator.clipboard.writeText(phoneNumber.textContent).then(() => {
    copyNotification.style.opacity = 1;
    setTimeout(() => { copyNotification.style.opacity = 0; }, 1500);
  });
});
