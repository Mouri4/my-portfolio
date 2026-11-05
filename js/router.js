/* ============================================================
   CLEAN SECTION URLS  (/about, /skills, /projects ...)
   The home page is one long page. Clicking a menu link scrolls to
   its section and updates the address bar without reloading.
   Opening one of these URLs directly works through 404.html.
   ============================================================ */
(function () {
  var MAP = { home: 'home', about: 'about', skills: 'skills', experience: 'experience',
    projects: 'projects', education: 'education', cv: 'cv', contact: 'contacts' };

  function parse() {
    var segs = location.pathname.split('/').filter(Boolean);
    for (var i = 0; i < segs.length; i++) {
      if (MAP[segs[i]] && segs[i] !== 'home') {
        return { key: segs[i], base: '/' + segs.slice(0, i).join('/') + (i ? '/' : '') };
      }
    }
    var base = location.pathname.replace(/[^\/]*$/, '');   // drop index.html if present
    return { key: null, base: base || '/' };
  }

  var info = parse();

  function setCurrent(key) {
    [].forEach.call(document.querySelectorAll('.nav-selection a[data-route]'), function (a) {
      if (a.getAttribute('data-route') === key) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function scrollTo(key, smooth) {
    var el = document.getElementById(MAP[key]);
    if (!el) return;
    if (key === 'home') { window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' }); return; }
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });   // scroll-margin clears the nav
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-route]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button) return;
    var key = a.getAttribute('data-route');
    if (!MAP[key]) return;
    e.preventDefault();
    var url = key === 'home' ? info.base : info.base + key;
    if (location.pathname !== url) { try { history.pushState({ k: key }, '', url); } catch (err) { } }
    setCurrent(key);
    scrollTo(key, true);
  });

  window.addEventListener('popstate', function () {
    var k = parse().key || 'home';
    setCurrent(k);
    scrollTo(k, true);
  });

  /* direct visit to /about etc.: jump once the page has laid out */
  if (info.key) {
    setCurrent(info.key);
    window.addEventListener('load', function () { setTimeout(function () { scrollTo(info.key, false); }, 150); });
  } else {
    setCurrent('home');
  }
})();
