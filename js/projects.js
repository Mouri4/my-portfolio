/* ============================================================
   PROJECT CARDS + SEARCH / FILTER  (no page reload)
   Data comes from projects-data.js.
   Search matches name, description, category, type, year, role,
   status and tools.
   ============================================================ */
(function () {
  var data = window.PROJECTS || [];
  var grid = document.getElementById('proj-grid');
  if (!grid) return;

  var q = document.getElementById('proj-q');
  var selType = document.getElementById('proj-type');
  var selYear = document.getElementById('proj-year');
  var chips = document.getElementById('proj-chips');
  var count = document.getElementById('proj-count');
  var reset = document.getElementById('proj-reset');
  var category = '';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function uniq(key) {
    var seen = {}, out = [];
    data.forEach(function (p) { var v = String(p[key]); if (v && !seen[v]) { seen[v] = 1; out.push(v); } });
    return out;
  }

  /* ----- build the filter controls from the data ----- */
  uniq('type').sort().forEach(function (t) { var o = el('option', null, t); o.value = t; selType.appendChild(o); });
  uniq('year').sort().reverse().forEach(function (y) { var o = el('option', null, y); o.value = y; selYear.appendChild(o); });

  function chip(label, value) {
    var b = el('button', 'chip', label);
    b.type = 'button';
    b.setAttribute('aria-pressed', value === category ? 'true' : 'false');
    b.addEventListener('click', function () {
      category = value;
      [].forEach.call(chips.children, function (c) { c.setAttribute('aria-pressed', c === b ? 'true' : 'false'); });
      render();
    });
    return b;
  }
  chips.appendChild(chip('All', ''));
  uniq('category').forEach(function (c) { chips.appendChild(chip(c, c)); });

  /* ----- matching ----- */
  function haystack(p) {
    return [p.name, p.description, p.category, p.type, p.year, p.role, p.status].concat(p.technologies || [])
      .join(' ').toLowerCase();
  }
  function matches(p) {
    if (category && p.category !== category) return false;
    if (selType.value && p.type !== selType.value) return false;
    if (selYear.value && String(p.year) !== selYear.value) return false;
    var words = q.value.toLowerCase().split(/\s+/).filter(Boolean);
    var h = haystack(p);
    for (var i = 0; i < words.length; i++) if (h.indexOf(words[i]) === -1) return false;
    return true;
  }

  /* ----- card ----- */
  function card(p) {
    var href = 'projects/' + p.slug + '/';
    var art = el('article', 'proj-card');

    var media = el('a', 'pc-media'); media.href = href; media.tabIndex = -1;
    media.setAttribute('aria-hidden', 'true');
    if (p.image) {
      var im = el('img'); im.src = encodeURI(p.image); im.alt = ''; im.loading = 'lazy'; im.decoding = 'async';
      im.onerror = function () { im.remove(); media.classList.add('pc-ph'); media.textContent = p.name.charAt(0); };
      media.appendChild(im);
    } else {
      media.classList.add('pc-ph');
      media.textContent = p.category === 'Information System' ? 'POS' : p.name.charAt(0);
    }
    art.appendChild(media);

    var body = el('div', 'pc-body');
    var top = el('div', 'pc-top');
    top.appendChild(el('span', 'pc-cat', p.category));
    top.appendChild(el('span', 'pc-status', p.status));
    body.appendChild(top);
    body.appendChild(el('h3', 'pc-title', p.name));
    body.appendChild(el('p', 'pc-desc', p.description));

    var meta = el('p', 'pc-meta');
    meta.textContent = p.year + '  ·  ' + p.type + '  ·  ' + p.role;
    body.appendChild(meta);

    var tags = el('ul', 'pc-tags');
    (p.technologies || []).forEach(function (t) { tags.appendChild(el('li', null, t)); });
    body.appendChild(tags);

    var actions = el('div', 'pc-actions');
    var view = el('a', 'btn', 'View Project'); view.href = href;
    view.setAttribute('aria-label', 'View project: ' + p.name);
    actions.appendChild(view);
    [['GitHub', p.github], ['Demo', p.demo]].forEach(function (l) {
      if (!l[1]) return;                       // only show links that exist
      var a = el('a', 'btn alt', l[0]); a.href = l[1]; a.target = '_blank'; a.rel = 'noopener noreferrer';
      actions.appendChild(a);
    });
    body.appendChild(actions);
    art.appendChild(body);
    return art;
  }

  function render() {
    var list = data.filter(matches);
    grid.textContent = '';
    list.forEach(function (p) { grid.appendChild(card(p)); });
    if (!list.length) {
      grid.appendChild(el('p', 'proj-empty', 'No projects match your search. Try another word or press Reset.'));
    }
    count.textContent = list.length + (list.length === 1 ? ' project' : ' projects') + ' shown';
  }

  q.addEventListener('input', render);
  selType.addEventListener('change', render);
  selYear.addEventListener('change', render);
  reset.addEventListener('click', function () {
    q.value = ''; selType.value = ''; selYear.value = ''; category = '';
    [].forEach.call(chips.children, function (c, i) { c.setAttribute('aria-pressed', i === 0 ? 'true' : 'false'); });
    render();
    q.focus();
  });

  render();
})();
