// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Dark / light toggle (remembers the choice)
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  btn.addEventListener('click', function () {
    var current = root.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// Mobile menu
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  function setOpen(open) {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setOpen(!links.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
})();

// Fade sections in as they scroll into view
(function () {
  if (!('IntersectionObserver' in window)) return;
  var items = document.querySelectorAll('.section, .card');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
})();

// Click an event or research photo to view it full size
(function () {
  var imgs = document.querySelectorAll('.event-img, .card-img');
  if (!imgs.length) return;
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="">';
  document.body.appendChild(box);
  var big = box.querySelector('img');
  var last = null;
  function open(img) {
    last = img;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    box.classList.add('open');
    box.querySelector('.lightbox-close').focus();
  }
  function close() {
    box.classList.remove('open');
    big.src = '';
    if (last) last.focus();
  }
  imgs.forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && box.classList.contains('open')) close();
  });
})();
