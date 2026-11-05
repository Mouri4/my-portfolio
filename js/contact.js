/* ============================================================
   CONTACT FORM + SOCIAL LINKS
   - No backend needed: the form posts to FormSubmit (formsubmit.co),
     a free email-forwarding service. The FIRST message you send
     makes FormSubmit email you an activation link; click it once.
   - Spam protection: hidden honeypot field, minimum fill time,
     30-second cooldown, and input limits. If sending fails, a
     pre-filled email opens as a fallback.
   - Visitor text is only ever written with textContent (no XSS).
   ============================================================ */
(function () {
  /* ----- social links from SOCIALS in projects-data.js ----- */
  var socials = window.SOCIALS || {};
  [].forEach.call(document.querySelectorAll('a[data-social]'), function (a) {
    var url = socials[a.getAttribute('data-social')];
    if (!url || !/^https?:\/\//i.test(url)) return;
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.removeAttribute('hidden');
  });

  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('cf-status');
  var btn = document.getElementById('cf-submit');
  var opened = Date.now();
  var COOLDOWN = 30000;
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function say(msg, ok) {
    status.textContent = msg;
    status.className = 'cf-status ' + (ok ? 'ok' : 'err');
  }
  function clean(v) { return String(v || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim(); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var name = clean(f.name.value), email = clean(f.email.value),
      subject = clean(f.subject.value), message = clean(f.message.value);

    if (f.website.value) return;                                   // honeypot filled: bot
    if (!name || !email || !subject || !message) { say('Please fill in every field.', false); return; }
    if (!EMAIL.test(email)) { say('Please enter a valid email address.', false); f.email.focus(); return; }
    if (message.length < 10) { say('Your message is a little short. Please add more detail.', false); return; }
    if (Date.now() - opened < 3000) { say('Please wait a moment and try again.', false); return; }

    var last = 0;
    try { last = +localStorage.getItem('cf-last') || 0; } catch (err) { }
    if (Date.now() - last < COOLDOWN) { say('Please wait a few seconds before sending another message.', false); return; }

    btn.disabled = true; say('Sending...', true);

    var fallback = function () {
      var href = 'mailto:jhoncentaulo79@gmail.com?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(message + '\n\n' + name + ' (' + email + ')');
      say('Could not send from the page. Your email app will open instead.', false);
      window.location.href = href;
    };

    fetch(form.getAttribute('data-endpoint'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: name, email: email, message: message,
        _subject: 'Portfolio message: ' + subject, _replyto: email, _captcha: 'false', _template: 'table' })
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && String(res.j.success) !== 'false') {
          try { localStorage.setItem('cf-last', String(Date.now())); } catch (err) { }
          form.reset(); opened = Date.now();
          say('Thank you! Your message was sent.', true);
        } else { fallback(); }
      })
      .catch(fallback)
      .then(function () { btn.disabled = false; });
  });
})();
