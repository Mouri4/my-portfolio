/* ============================================================
   PROJECT DETAIL PAGE  (/projects/<slug>/)
   Reads the slug from <body data-slug="..."> and builds the page
   from window.PROJECTS (projects-data.js). Nothing here needs
   editing when you add a project.
   ============================================================ */
(function () {
  var ROOT = '../../';                       // project pages live two folders deep
  var app = document.getElementById('app');
  var slug = document.body.getAttribute('data-slug');
  var list = window.PROJECTS || [];
  var idx = -1;
  list.forEach(function (p, i) { if (p.slug === slug) idx = i; });
  var p = list[idx];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function asset(path) { return ROOT + encodeURI(path); }

  /* ---------- shared wave shapes + nav (same markup/classes as the home page) ---------- */
  var DEFS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<path id="wv-below" d="M-800 25 Q-600 -15 -400 25 T0 25 T400 25 T800 25 T1200 25 T1600 25 T2000 25 T2400 25 T2800 25 T3200 25 T3600 25 T4000 25 L4000 50 L-800 50 Z"/>' +
    '<path id="wv-below-line" fill="none" vector-effect="non-scaling-stroke" d="M-800 25 Q-600 -15 -400 25 T0 25 T400 25 T800 25 T1200 25 T1600 25 T2000 25 T2400 25 T2800 25 T3200 25 T3600 25 T4000 25"/>' +
    '<path id="wv-above" d="M-800 25 Q-600 65 -400 25 T0 25 T400 25 T800 25 T1200 25 T1600 25 T2000 25 T2400 25 T2800 25 T3200 25 T3600 25 T4000 25 L4000 0 L-800 0 Z"/>' +
    '<path id="wv-above-line" fill="none" vector-effect="non-scaling-stroke" d="M-800 25 Q-600 65 -400 25 T0 25 T400 25 T800 25 T1200 25 T1600 25 T2000 25 T2400 25 T2800 25 T3200 25 T3600 25 T4000 25"/>' +
    '<filter id="rough" x="-3%" y="-3%" width="106%" height="106%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G"/></filter>' +
    '</defs></svg>';

  var NAV = '<a class="skip-link" href="#main-content">Skip to content</a>' +
    '<div class="nav"><div class="nav-section">' +
    '<div class="nav-left"><p>PORTFOLIO</p></div>' +
    '<div class="nav-mid" id="nav-menu"><div class="nav-selection">' +
    '<a href="' + ROOT + '">Home</a> <a href="' + ROOT + 'about">About</a> <a href="' + ROOT + 'skills">Skills</a> ' +
    '<a href="' + ROOT + 'experience">Experience</a> <a href="' + ROOT + 'projects" aria-current="page">Projects</a> ' +
    '<a href="' + ROOT + 'education">Education</a> <a href="' + ROOT + 'cv">CV</a> <a href="' + ROOT + 'contact">Contact</a>' +
    '</div></div>' +
    '<div class="nav-right">' +
    '<button class="theme-toggle" id="theme-toggle" type="button" aria-label="Switch to dark mode" title="Switch to dark mode">' +
    '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
    '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
    '</button>' +
    '<button class="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu"><span></span><span></span><span></span></button>' +
    '</div></div></div>';

  var WAVE_TOP = '<div class="curve-border top"><svg viewBox="-800 0 4800 50" preserveAspectRatio="none"><use href="#wv-above" class="curve-fill"/><use href="#wv-above-line" class="curve-line top-line"/></svg></div>';
  var WAVE_BOTTOM = '<div class="curve-border bottom"><svg viewBox="-800 0 4800 50" preserveAspectRatio="none"><use href="#wv-below" class="curve-fill"/><use href="#wv-below-line" class="curve-line bottom-line"/></svg></div>';

  function footer() {
    return '<footer class="footer footer-rich"><div class="foot-inner">' +
      '<div><strong>Jhoncen A. Taulo</strong><br><span>Graphic Designer / UI-UX / 3D Artist</span></div>' +
      '<div><a href="mailto:jhoncentaulo79@gmail.com">jhoncentaulo79@gmail.com</a></div>' +
      '<nav aria-label="Footer"><a href="' + ROOT + '">Home</a><a href="' + ROOT + 'about">About</a><a href="' + ROOT + 'projects">Projects</a><a href="' + ROOT + 'cv">CV</a><a href="' + ROOT + 'contact">Contact</a></nav>' +
      '</div><p class="foot-copy">&copy; 2026 Jhoncen A. Taulo. All rights reserved.</p></footer>';
  }

  /* ---------- page ---------- */
  app.innerHTML = DEFS + NAV;

  if (!p) {                                   // unknown slug
    var nf = el('main', 'pj-wrap');
    nf.id = 'main-content';
    nf.appendChild(el('h1', 'pj-nf', 'Project not found'));
    var back = el('a', 'btn', 'Back to projects'); back.href = ROOT + 'projects';
    nf.appendChild(back);
    app.appendChild(nf);
    app.insertAdjacentHTML('beforeend', footer());
    wireNav();
    return;
  }

  document.title = p.name + ' | Jhoncen A. Taulo';

  var main = el('main');
  main.id = 'main-content';

  /* title band */
  var band = el('section', 'band pj-band');
  band.style.setProperty('--band', '#777777');
  band.insertAdjacentHTML('beforeend', WAVE_TOP);
  var h1 = el('h1', 'rough-title sm pj-title', p.name);
  band.appendChild(h1);
  band.insertAdjacentHTML('beforeend', WAVE_BOTTOM);
  main.appendChild(band);

  var wrap = el('div', 'pj-wrap');

  var crumb = el('p', 'pj-crumb');
  var all = el('a', null, '← All projects'); all.href = ROOT + 'projects';
  crumb.appendChild(all);
  wrap.appendChild(crumb);

  /* meta row */
  var meta = el('dl', 'pj-meta');
  [['Category', p.category], ['Project type', p.type], ['Year', String(p.year)], ['Status', p.status], ['My role', p.role]]
    .forEach(function (m) {
      if (!m[1]) return;
      var d = el('div');
      d.appendChild(el('dt', null, m[0]));
      d.appendChild(el('dd', null, m[1]));
      meta.appendChild(d);
    });
  wrap.appendChild(meta);

  /* text sections */
  function section(title, build) {
    var s = el('section', 'pj-sec');
    s.appendChild(el('h2', null, title));
    build(s);
    wrap.appendChild(s);
  }
  if (p.overview) section('Project Overview', function (s) { s.appendChild(el('p', null, p.overview)); });
  if (p.problem) section('Problem', function (s) { s.appendChild(el('p', null, p.problem)); });
  if (p.solution) section('Solution', function (s) { s.appendChild(el('p', null, p.solution)); });
  if (p.features && p.features.length) section('Features', function (s) {
    var ul = el('ul', 'pj-list');
    p.features.forEach(function (f) { ul.appendChild(el('li', null, f)); });
    s.appendChild(ul);
  });
  if (p.technologies && p.technologies.length) section('Tools & Techniques', function (s) {
    var ul = el('ul', 'pj-tags');
    p.technologies.forEach(function (t) { ul.appendChild(el('li', null, t)); });
    s.appendChild(ul);
  });
  section('My Role', function (s) { s.appendChild(el('p', null, p.role)); });

  /* screenshots (only if there are any) */
  if (p.screenshots && p.screenshots.length) section('Screenshots', function (s) {
    var g = el('div', 'pj-shots');
    p.screenshots.forEach(function (sh) {
      var fig = el('figure');
      var im = el('img');
      im.src = asset(sh.src); im.alt = sh.alt || ''; im.loading = 'lazy'; im.decoding = 'async';
      fig.appendChild(im);
      g.appendChild(fig);
    });
    s.appendChild(g);
  });

  /* links: only the ones that actually exist */
  var links = [['Live Website', p.url], ['GitHub', p.github], ['Demo', p.demo], ['Documentation', p.docs]]
    .filter(function (l) { return l[1]; });
  if (links.length) section('Project Links', function (s) {
    var row = el('div', 'pj-links');
    links.forEach(function (l) {
      var a = el('a', 'btn', l[0]);
      a.href = l[1]; a.target = '_blank'; a.rel = 'noopener noreferrer';
      row.appendChild(a);
    });
    s.appendChild(row);
  });

  /* prev / next */
  var pn = el('nav', 'pj-pn');
  pn.setAttribute('aria-label', 'More projects');
  function pnLink(proj, label) {
    var a = el('a', 'pj-pn-link');
    a.href = ROOT + 'projects/' + proj.slug + '/';
    a.appendChild(el('span', null, label));
    a.appendChild(el('strong', null, proj.name));
    return a;
  }
  if (list.length > 1) {
    pn.appendChild(pnLink(list[(idx - 1 + list.length) % list.length], '← Previous'));
    var nx = pnLink(list[(idx + 1) % list.length], 'Next →');
    nx.className += ' next';
    pn.appendChild(nx);
    wrap.appendChild(pn);
  }

  main.appendChild(wrap);
  app.appendChild(main);
  app.insertAdjacentHTML('beforeend', footer());
  wireNav();

  /* ---------- theme + hamburger ---------- */
  function wireNav() {
    var root = document.documentElement;
    var toggle = document.getElementById('theme-toggle');
    function paint() {
      var dark = root.getAttribute('data-theme') === 'dark';
      var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
      toggle.setAttribute('aria-label', label); toggle.setAttribute('title', label);
    }
    toggle.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      if (dark) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('theme', dark ? 'light' : 'dark'); } catch (e) { }
      paint();
    });
    paint();

    var burger = document.getElementById('burger');
    var menu = document.getElementById('nav-menu');
    function setMenu(open) {
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.nav')) setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setMenu(false); });
  }
})();
