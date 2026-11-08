/* Maison Elm — page motion and small behaviours.
   Everything here is an enhancement: with scripts off, or with
   "reduce motion" turned on, the page still reads top to bottom. */
(function () {
  'use strict';

  var root = document.documentElement;
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = motionQuery.matches;

  /* ---------- Load choreography ---------- */
  function markLoaded() { if (!document.body.classList.contains('is-loaded')) document.body.classList.add('is-loaded'); }
  var heroImg = document.querySelector('.hero__photo img');
  var ready = [];
  if (document.fonts && document.fonts.ready) ready.push(document.fonts.ready);
  if (heroImg && !heroImg.complete) ready.push(new Promise(function (r) { heroImg.addEventListener('load', r); heroImg.addEventListener('error', r); }));
  Promise.all(ready).then(function () { requestAnimationFrame(markLoaded); });
  setTimeout(markLoaded, 1800); // never wait too long

  /* ---------- Year ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: solid after the hero, hides while scrolling down ---------- */
  var header = document.querySelector('.site-header');
  var lastY = window.scrollY;
  function onHeaderScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    if (!document.body.classList.contains('nav-open')) {
      header.classList.toggle('is-hidden', y > lastY && y > 400);
    }
    lastY = y;
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setNav(open) {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.nav-toggle__label').textContent = open ? 'Close' : 'Menu';
  }
  toggle.addEventListener('click', function () { setNav(!document.body.classList.contains('nav-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });

  /* ---------- Reveal on scroll + counters ---------- */
  function countUp(el) {
    var to = parseInt(el.getAttribute('data-count'), 10);
    var from = parseInt(el.getAttribute('data-from') || '0', 10);
    var pad = parseInt(el.getAttribute('data-pad') || '0', 10);
    var fmt = function (n) { var s = String(n); while (s.length < pad) s = '0' + s; return s; };
    if (reduced) { el.textContent = fmt(to); return; }
    var start = null, dur = 1700;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = fmt(from);
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        var num = entry.target.querySelector('[data-count]');
        if (num) countUp(num);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Process: one giant numeral that follows the steps ---------- */
  var digit = document.querySelector('.process__digit');
  var steps = document.querySelectorAll('.step');
  var currentStep = 0;
  function setStep(n) {
    if (n === currentStep) return;
    currentStep = n;
    steps.forEach(function (s) { s.classList.toggle('is-current', s.getAttribute('data-step') === String(n)); });
    if (!digit) return;
    if (reduced) { digit.textContent = n; return; }
    digit.classList.add('is-out');
    setTimeout(function () {
      digit.textContent = n;
      digit.classList.remove('is-out');
      digit.classList.add('is-in');
      void digit.offsetWidth;
      digit.classList.remove('is-in');
    }, 280);
  }
  function onProcessScroll() {
    var mid = window.innerHeight * 0.55, best = 1;
    steps.forEach(function (s) { if (s.getBoundingClientRect().top < mid) best = parseInt(s.getAttribute('data-step'), 10); });
    setStep(best);
  }

  /* ---------- THE TOUR: holds on screen while the house slides sideways ---------- */
  var tour = document.querySelector('.tour');
  var sticky = tour.querySelector('.tour__sticky');
  var track = tour.querySelector('.tour__track');
  var rooms = Array.prototype.slice.call(tour.querySelectorAll('.room'));
  var indexBtns = Array.prototype.slice.call(tour.querySelectorAll('[data-go]'));
  var bar = tour.querySelector('.tour__progress span');
  var distance = 0, pinned = false, activeRoom = -1;

  var roomParts = rooms.map(function (r) {
    return { el: r, img: r.querySelector('.room__frame img'), inset: r.querySelector('.room__inset') };
  });

  var stops = [];      // track positions where the tour pauses: intro, each room, outro
  var HOLD = 0.38;     // share of each scroll step spent holding still on a room

  function layoutTour() {
    pinned = !reduced;
    tour.classList.toggle('tour--pinned', pinned);
    if (!pinned) {
      tour.style.height = '';
      track.style.transform = '';
      roomParts.forEach(function (p) { p.img.style.transform = ''; p.inset.style.transform = ''; p.el.classList.add('is-seen'); });
      return;
    }
    var vw = window.innerWidth;
    distance = Math.max(0, track.scrollWidth - vw);
    stops = [0];
    rooms.forEach(function (r) {
      var x = r.offsetLeft - (vw - r.offsetWidth) / 2;
      stops.push(Math.min(Math.max(x, 0), distance));
    });
    stops.push(distance);
    var perStep = Math.max(window.innerHeight * 0.85, 520);
    tour.style.height = ((stops.length - 1) * perStep + sticky.offsetHeight) + 'px';
    updateTour();
  }

  function tourProgress() {
    var rect = tour.getBoundingClientRect();
    var scrollable = tour.offsetHeight - sticky.offsetHeight;
    return scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
  }

  // progress (0–1) → track position, pausing on each stop
  function positionFor(p) {
    var steps = stops.length - 1;
    if (steps < 1) return 0;
    var f = p * steps;
    var i = Math.min(Math.floor(f), steps - 1);
    var t = f - i;
    var m = Math.min(Math.max((t - HOLD / 2) / (1 - HOLD), 0), 1);
    var eased = m * m * (3 - 2 * m);
    return stops[i] + (stops[i + 1] - stops[i]) * eased;
  }

  function updateTour() {
    if (!pinned) return;
    var p = tourProgress();
    var x = positionFor(p);
    var vw = window.innerWidth;
    track.style.transform = 'translate3d(' + (-x).toFixed(1) + 'px,0,0)';
    if (bar) bar.style.transform = 'scaleX(' + (distance ? x / distance : 0).toFixed(4) + ')';

    var nearest = -1, nearestD = Infinity;
    roomParts.forEach(function (part, i) {
      var center = part.el.offsetLeft - x + part.el.offsetWidth / 2;
      var d = (center - vw / 2) / vw;            // -1 … 1 as the room passes
      var ad = Math.abs(d);
      if (ad < 1.3) {
        part.img.style.transform = 'translate3d(' + (d * -7).toFixed(2) + '%,0,0)';
        part.inset.style.transform = 'translate3d(' + (d * -60).toFixed(1) + 'px,' + (d * 26).toFixed(1) + 'px,0) rotate(' + (d * -3).toFixed(2) + 'deg)';
      }
      if (ad < 0.42) part.el.classList.add('is-seen');
      if (ad < nearestD) { nearestD = ad; nearest = i; }
    });
    if (nearestD > 0.6) nearest = -1;
    if (nearest !== activeRoom) {
      activeRoom = nearest;
      indexBtns.forEach(function (b, i) { b.setAttribute('aria-current', i === activeRoom ? 'true' : 'false'); });
    }
  }

  indexBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var i = parseInt(btn.getAttribute('data-go'), 10);
      var room = rooms[i];
      if (!pinned) { room.scrollIntoView({ behavior: 'smooth' }); return; }
      var p = (i + 1) / (stops.length - 1);   // the middle of that room's pause
      var top = tour.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + p * (tour.offsetHeight - sticky.offsetHeight), behavior: 'smooth' });
    });
  });

  /* ---------- One scroll loop for everything ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onHeaderScroll();
      updateTour();
      onProcessScroll();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var resizeTimer;
  var lastW = window.innerWidth;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // phones fire resize when the address bar slides away — only re-measure on width changes
      if (window.innerWidth === lastW && pinned) return;
      lastW = window.innerWidth;
      layoutTour();
    }, 150);
  });
  window.addEventListener('load', layoutTour);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutTour);

  function onMotionChange(e) { reduced = e.matches; layoutTour(); }
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionChange);
  else if (motionQuery.addListener) motionQuery.addListener(onMotionChange);

  layoutTour();
  onScroll();

  /* ---------- Enquiry form ----------
     Works out of the box on Netlify (Netlify Forms). Opened as a
     local file, or anywhere without a form service, it says so
     plainly and points people to the phone number instead. */
  var form = document.querySelector('.form');
  var status = form.querySelector('.form__status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (input) {
      var valid = input.value.trim() !== '' && (input.type !== 'email' || /.+@.+\..+/.test(input.value));
      input.closest('.field').classList.toggle('is-invalid', !valid);
      if (!valid && ok) { input.focus(); ok = false; }
    });
    if (!ok) { status.textContent = 'Please add your name and a working email address.'; return; }

    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = 'Sending…';
    var body = new URLSearchParams(new FormData(form)).toString();

    var fallback = 'This form isn’t connected yet. Please call (555) 012-6194 and we’ll take it from there.';
    if (location.protocol === 'file:') { status.textContent = fallback; button.disabled = false; return; }

    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = 'Thank you — your note is with the studio. We’ll be in touch soon.';
      })
      .catch(function () { status.textContent = fallback; })
      .then(function () { button.disabled = false; });
  });
})();
