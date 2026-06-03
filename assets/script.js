/* Vanuatu Citizenship Office — shared behaviour */
(function () {
  // Header condense on scroll
  var header = document.querySelector('header.site');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  var panel = document.getElementById('mpanel');
  var openBtn = document.getElementById('open-menu');
  var closeBtn = document.getElementById('close-menu');
  function setMenu(open) {
    if (!panel) return;
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    if (openBtn) openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (openBtn) openBtn.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  if (panel) panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  // Active nav link (by filename)
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    if (a.getAttribute('data-nav') === path) a.classList.add('active');
  });

  // Reveal on scroll
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Sidenav scroll-spy (pages with .sidenav + .anchor sections)
  var spy = document.querySelectorAll('.sidenav a[href^="#"]');
  if (spy.length && 'IntersectionObserver' in window) {
    var map = {};
    spy.forEach(function (a) { var id = a.getAttribute('href').slice(1); var s = document.getElementById(id); if (s) map[id] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          spy.forEach(function (a) { a.classList.remove('active'); });
          if (map[e.target.id]) map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -65% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  // Agent directory: search + category filter
  var search = document.getElementById('agent-search');
  var dir = document.getElementById('directory');
  if (dir) {
    var chips = document.querySelectorAll('.chip[data-cat]');
    var countEl = document.getElementById('dircount');
    var cards = Array.prototype.slice.call(dir.querySelectorAll('.agent'));
    var activeCat = 'all';
    function apply() {
      var q = (search && search.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (c) {
        var matchCat = activeCat === 'all' || (c.getAttribute('data-cat') || '').indexOf(activeCat) !== -1;
        var matchQ = !q || c.textContent.toLowerCase().indexOf(q) !== -1;
        var show = matchCat && matchQ;
        c.style.display = show ? '' : 'none';
        if (show) shown++;
      });
      if (countEl) countEl.textContent = shown + ' agent' + (shown === 1 ? '' : 's') + ' shown';
    }
    if (search) search.addEventListener('input', apply);
    chips.forEach(function (ch) {
      ch.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.remove('active'); });
        ch.classList.add('active');
        activeCat = ch.getAttribute('data-cat');
        apply();
      });
    });
    apply();
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
