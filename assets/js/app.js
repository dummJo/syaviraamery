/* Dr. Syavira Amelia Risanty — portfolio interactions (vanilla, no dependencies)
   1) Hero "drag to reveal" — warm minimalist <-> clinical mode, auto-oscillating until interacted.
   2) Contact form — client validation + delivery via FormSubmit.co (no backend). */
(function () {
  'use strict';

  /* ---------------- Hero drag-to-reveal ---------------- */
  var home = document.getElementById('home');
  if (home) {
    var layerB = document.getElementById('layerB');
    var divider = document.getElementById('divider');
    var hint = document.getElementById('hint');
    var hudEls = Array.prototype.slice.call(home.querySelectorAll('[data-hud]'));
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var cur = 50, target = 50, t = 0, auto = true, revealed = null, idleTimer = null;

    hudEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px) scale(.92)';
      el.style.transition = 'opacity .55s cubic-bezier(.2,.8,.2,1), transform .55s cubic-bezier(.2,.8,.2,1)';
      el.style.willChange = 'opacity, transform';
    });

    if (reduce) { auto = false; target = 50; cur = 50; if (hint) hint.style.opacity = '0'; }

    function setTargetFromX(x) {
      var r = home.getBoundingClientRect();
      target = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100));
    }
    function stopAuto() {
      auto = false;
      clearTimeout(idleTimer);
      if (hint) hint.style.opacity = '0';
    }

    home.addEventListener('mousemove', function (e) { stopAuto(); setTargetFromX(e.clientX); });
    home.addEventListener('mouseleave', function () { idleTimer = setTimeout(function () { auto = true; }, 1800); });
    home.addEventListener('touchmove', function (e) {
      stopAuto();
      var tt = e.touches && e.touches[0];
      if (tt) setTargetFromX(tt.clientX);
    }, { passive: true });
    home.addEventListener('touchend', function () { idleTimer = setTimeout(function () { auto = true; }, 2400); });

    function applyHud(on) {
      hudEls.forEach(function (el, i) {
        el.style.transitionDelay = (on ? i * 75 : 0) + 'ms';
        el.style.opacity = on ? '1' : '0';
        el.style.transform = on ? 'translateY(0) scale(1)' : 'translateY(14px) scale(.92)';
      });
    }

    function loop() {
      t += 0.016;
      if (auto) target = 50 + Math.sin(t * 0.7) * 47;
      cur += (target - cur) * 0.14;
      var p = cur;
      if (layerB) layerB.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)';
      if (divider) divider.style.left = p + '%';
      var want = p > 14;
      if (want !== revealed) { revealed = want; applyHud(want); }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ---------------- Contact form (FormSubmit.co AJAX) ---------------- */
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/hello@drsyavira.id';
  var formView = document.getElementById('formView');
  var sentView = document.getElementById('sentView');
  var errEl = document.getElementById('formError');
  var btn = document.getElementById('submitBtn');
  var fName = document.getElementById('fName');
  var fEmail = document.getElementById('fEmail');
  var fMessage = document.getElementById('fMessage');
  var sending = false;
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  function showError(msg) {
    if (!errEl) return;
    errEl.textContent = msg || '';
    errEl.style.display = msg ? 'block' : 'none';
  }

  [fName, fEmail, fMessage].forEach(function (el) {
    if (el) el.addEventListener('input', function () { showError(''); });
  });

  if (btn) {
    btn.addEventListener('click', function () {
      if (sending) return;
      var name = (fName.value || '').trim();
      var email = (fEmail.value || '').trim();
      var message = (fMessage.value || '').trim();
      if (!name || !email || !message) { showError('Please complete all fields.'); return; }
      if (!EMAIL_RE.test(email)) { showError('Please enter a valid email address.'); return; }

      sending = true;
      btn.textContent = 'Sending…';
      btn.style.opacity = '0.7';
      showError('');

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: 'New consultation enquiry — drsyavira.id',
          _template: 'table'
        })
      })
        .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
        .then(function (r) {
          if (r.ok && (r.data.success === 'true' || r.data.success === true)) {
            if (formView) formView.style.display = 'none';
            if (sentView) sentView.style.display = 'block';
          } else {
            sending = false;
            btn.textContent = 'Send Message';
            btn.style.opacity = '1';
            showError((r.data && r.data.message) ? r.data.message : 'Something went wrong — please email hello@drsyavira.id directly.');
          }
        })
        .catch(function () {
          sending = false;
          btn.textContent = 'Send Message';
          btn.style.opacity = '1';
          showError('Network error — please email hello@drsyavira.id directly.');
        });
    });
  }
})();
