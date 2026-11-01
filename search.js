/* ============================================================
   DESIGN SEARCH
   To make a new design searchable: give its section an id in
   index.html and add one entry to DESIGNS below.
     title  : what shows in bold
     meta   : small grey line under it
     target : the id of the element to scroll to
     keys   : extra words people might type (not shown)
     main   : true = also listed when the box is empty
     thumb  : { img: 'path' } | { text: 'Aa' } | { swatch: true }
   ============================================================ */
(function () {
  var DESIGNS = [
    {
      title: 'Brand Design', meta: 'Patience Fine Jewelry', target: 'designs', main: true,
      thumb: { img: 'ceel-img/logo-icon.png' },
      keys: 'brand identity branding logo jewelry jewellery lotus emblem patience fine navy gold'
    },
    {
      title: 'Logo & Lotus Emblem', meta: 'Brand Design \u00b7 Patience Fine Jewelry', target: 'brand-logo',
      thumb: { img: 'ceel-img/Badge-2.png' },
      keys: 'logo emblem lotus badge mark icon symbol'
    },
    {
      title: 'Typefaces', meta: 'Brand Design \u00b7 Playfair Display, Poltawski Nowy', target: 'brand-type',
      thumb: { text: 'Aa' },
      keys: 'typography fonts font playfair poltawski serif type'
    },
    {
      title: 'Color Palette', meta: 'Brand Design \u00b7 Soft blue, navy, gold, gray', target: 'brand-palette',
      thumb: { swatch: true },
      keys: 'colors colours color palette hex blue navy gold gray grey'
    },
    {
      title: 'Horizontal Logo', meta: 'Brand Design \u00b7 Wordmark lockup', target: 'brand-wordmark',
      thumb: { img: 'ceel-img/Horizontal Logo.png' },
      keys: 'wordmark lockup horizontal stacked logo wide'
    },
    {
      title: 'Digital Marketing Graphics', meta: 'Brew Haven', target: 'marketing', main: true,
      thumb: { img: 'ceel-img/Pumpkin-Spice-Latte-Splash.png' },
      keys: 'marketing ads advertising social media coffee brew haven pumpkin spice latte campaign autumn fall'
    },
    {
      title: 'Pumpkin Spice Latte', meta: 'Digital Marketing \u00b7 Brew Haven', target: 'brew-hero',
      thumb: { img: 'ceel-img/Pumpkin-Spice-Latte-Splash.png' },
      keys: 'latte coffee drink hero product cozy season splash'
    },
    {
      title: 'Banners, Social Posts & Newsletter', meta: 'Digital Marketing \u00b7 Brew Haven', target: 'brew-banners',
      thumb: { img: 'ceel-img/landing-page-banner.png' },
      keys: 'banner landing page social post ad newsletter web promo layout instagram facebook'
    },
    {
      title: 'Typography Brand Poster', meta: 'Patience Fine Jewelry \u00b7 Grand opening', target: 'poster', main: true,
      thumb: { img: 'ceel-img/TypographyBrandPoster.png' },
      keys: 'poster typography type grand opening september 2026 print gold dark'
    }
  ];

  var btn = document.getElementById('search-toggle');
  var panel = document.getElementById('search-panel');
  var input = document.getElementById('search-input');
  var clear = document.getElementById('search-clear');
  var list = document.getElementById('search-results');
  var burger = document.getElementById('burger');
  if (!btn || !panel || !input || !list) return;

  var field = input.parentNode;
  var shown = [];      // results currently rendered
  var active = -1;     // keyboard-highlighted index

  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function tokens(q) { return q.toLowerCase().split(/\s+/).filter(Boolean); }

  /* ---------- matching ---------- */
  function search(q) {
    var t = tokens(q);
    if (!t.length) return DESIGNS.filter(function (d) { return d.main; });
    var out = [];
    DESIGNS.forEach(function (d, i) {
      var title = d.title.toLowerCase();
      var rest = (d.meta + ' ' + d.keys).toLowerCase();
      var score = 0;
      for (var k = 0; k < t.length; k++) {
        if (title.indexOf(t[k]) > -1) score += 3;
        else if (rest.indexOf(t[k]) > -1) score += 1;
        else return;                       // every word must match something
      }
      out.push({ d: d, score: score, i: i });
    });
    out.sort(function (a, b) { return b.score - a.score || a.i - b.i; });
    return out.map(function (o) { return o.d; });
  }

  /* ---------- rendering ---------- */
  function mark(text, t) {
    var frag = document.createDocumentFragment();
    if (!t.length) { frag.appendChild(document.createTextNode(text)); return frag; }
    var re = new RegExp('(' + t.map(esc).join('|') + ')', 'ig');
    text.split(re).forEach(function (part, i) {
      if (i % 2) { var m = document.createElement('mark'); m.textContent = part; frag.appendChild(m); }
      else if (part) frag.appendChild(document.createTextNode(part));
    });
    return frag;
  }

  function thumb(d) {
    var el = document.createElement('span');
    el.className = 's-thumb';
    el.setAttribute('aria-hidden', 'true');
    if (d.thumb.img) {
      var im = document.createElement('img');
      im.alt = ''; im.loading = 'lazy'; im.src = encodeURI(d.thumb.img);
      im.onerror = function () { im.remove(); el.textContent = d.title.charAt(0); };
      el.appendChild(im);
    } else if (d.thumb.text) {
      el.textContent = d.thumb.text;
    } else if (d.thumb.swatch) {
      el.style.background = 'linear-gradient(135deg,#93B8DD 25%,#2C3D4E 25% 50%,#C9A500 50% 75%,#DEDEDE 75%)';
    }
    return el;
  }

  function render() {
    var q = input.value.trim();
    var t = tokens(q);
    shown = search(q);
    active = -1;
    list.textContent = '';

    field.classList.toggle('has-text', !!input.value);

    if (!shown.length) {
      var none = document.createElement('li');
      none.className = 'search-empty';
      none.setAttribute('role', 'presentation');
      none.textContent = 'No designs found for \u201c' + q + '\u201d. Try \u201clogo\u201d, \u201cposter\u201d or \u201ccoffee\u201d.';
      list.appendChild(none);
      return;
    }

    var label = document.createElement('li');
    label.className = 'search-label';
    label.setAttribute('role', 'presentation');
    label.textContent = q ? shown.length + (shown.length === 1 ? ' result' : ' results') : 'Projects';
    list.appendChild(label);

    shown.forEach(function (d, i) {
      var li = document.createElement('li');
      li.id = 'search-opt-' + i;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');

      var a = document.createElement('a');
      a.href = '#' + d.target;
      a.tabIndex = -1;
      a.appendChild(thumb(d));

      var text = document.createElement('span');
      text.className = 's-text';
      var title = document.createElement('span');
      title.className = 's-title';
      title.appendChild(mark(d.title, t));
      var meta = document.createElement('span');
      meta.className = 's-meta';
      meta.textContent = d.meta;
      text.appendChild(title);
      text.appendChild(meta);
      a.appendChild(text);

      a.addEventListener('click', function (e) { e.preventDefault(); go(d); });
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function setActive(i) {
    var opts = list.querySelectorAll('li[role="option"]');
    if (!opts.length) return;
    active = (i + opts.length) % opts.length;
    for (var k = 0; k < opts.length; k++) opts[k].setAttribute('aria-selected', k === active ? 'true' : 'false');
    input.setAttribute('aria-activedescendant', opts[active].id);
    opts[active].scrollIntoView({ block: 'nearest' });
  }

  /* ---------- open / close ---------- */
  function open() {
    if (burger && burger.getAttribute('aria-expanded') === 'true') burger.click();   // close the mobile menu
    panel.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    input.setAttribute('aria-expanded', 'true');
    render();
    setTimeout(function () { input.focus(); }, 30);
  }

  function close(returnFocus) {
    if (!panel.classList.contains('open')) return;
    panel.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    if (returnFocus) btn.focus();
  }

  /* ---------- jump to a design ---------- */
  function go(d) {
    var el = document.getElementById(d.target);
    close(false);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });   // scroll-margin keeps it clear of the nav
    try { history.pushState(null, '', '#' + d.target); } catch (e) { }
    setTimeout(function () {
      el.classList.remove('search-flash');
      void el.offsetWidth;                                       // restart the animation if already running
      el.classList.add('search-flash');
      setTimeout(function () { el.classList.remove('search-flash'); }, 2100);
    }, 450);
  }

  /* ---------- events ---------- */
  btn.addEventListener('click', function () { panel.classList.contains('open') ? close(false) : open(); });
  input.addEventListener('input', render);
  clear.addEventListener('click', function () { input.value = ''; render(); input.focus(); });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (shown.length) go(shown[active > -1 ? active : 0]);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close(true);
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || '')) || e.target.isContentEditable;
    if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); open(); }
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-panel') && !e.target.closest('#search-toggle')) close(false);
  });

  if (burger) burger.addEventListener('click', function () { close(false); });
})();