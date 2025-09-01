/* ---------- Lightbox & Carousel ---------- */
(function() {
  const thumbnails = document.querySelectorAll('.video-thumbnail');
  const lightbox = document.querySelector('.lightbox');
  const iframe = document.getElementById('lightbox-iframe');
  const closeBtn = document.querySelector('.close-lightbox');
  const carousel = document.querySelector('.projects-carousel');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  let currentIndex = 0;
  const items = Array.from(document.querySelectorAll('.video-item'));

  function openLightbox(index) {
    currentIndex = index;
    iframe.src = `https://www.youtube.com/embed/${items[index].dataset.videoId}?autoplay=1&rel=0`;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    iframe.src = '';
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function navigateLightbox(dir) {
    currentIndex += dir;
    if (currentIndex < 0) currentIndex = items.length - 1;
    if (currentIndex >= items.length) currentIndex = 0;
    iframe.src = `https://www.youtube.com/embed/${items[currentIndex].dataset.videoId}?autoplay=1&rel=0`;
  }

  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener('click', () => openLightbox(i));
    thumb.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
  });

  document.querySelector('.left-lightbox').addEventListener('click', () => navigateLightbox(-1));
  document.querySelector('.right-lightbox').addEventListener('click', () => navigateLightbox(1));

  /* ---------- Projects Carousel ---------- */
  function getVisibleCount() {
    const containerWidth = carousel.clientWidth;
    let total = 0, acc = 0;
    items.forEach(item => {
      const style = getComputedStyle(item);
      const w = item.offsetWidth + parseFloat(style.marginRight);
      if (acc + w <= containerWidth) { acc += w; total++; }
    });
    return total || 1;
  }

  function scrollCarousel(dir) {
    const count = getVisibleCount();
    const itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(items[0]).marginRight);
    carousel.scrollBy({ left: dir * itemWidth * count, behavior: 'smooth' });
  }

  leftArrow.addEventListener('click', () => scrollCarousel(-1));
  rightArrow.addEventListener('click', () => scrollCarousel(1));

  /* ---------- Smooth scroll for nav ---------- */
  document.querySelectorAll('.main-nav a.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- Phone click copy ---------- */
  const phoneEl = document.querySelector('.phone-number');
  phoneEl.addEventListener('click', () => {
    navigator.clipboard.writeText(phoneEl.textContent.replace('Phone: ',''));
    phoneEl.style.color = 'var(--accent)';
    setTimeout(() => phoneEl.style.color = '', 300);
  });
})();
