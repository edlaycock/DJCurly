// Gallery framing: reproduces the crop/zoom set in the original design.
// data-s = zoom, data-x/data-y = pan (% of frame), data-fit = baseline
// (cover fills the frame, contain letterboxes before zoom).
document.querySelectorAll('[data-frame]').forEach(function (frame) {
  var img = frame.querySelector('img');
  var s = parseFloat(frame.dataset.s || '1');
  var x = parseFloat(frame.dataset.x || '0');
  var y = parseFloat(frame.dataset.y || '0');
  var contain = frame.dataset.fit === 'contain';

  function apply() {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var fw = frame.clientWidth, fh = frame.clientHeight;
    if (!iw || !ih || !fw || !fh) return;
    var base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
    var k = base * s;
    img.style.position = 'absolute';
    img.style.maxWidth = 'none';
    img.style.width = (iw * k / fw * 100) + '%';
    img.style.height = (ih * k / fh * 100) + '%';
    img.style.left = (50 + x) + '%';
    img.style.top = (50 + y) + '%';
    img.style.transform = 'translate(-50%, -50%)';
    img.style.objectFit = '';
  }

  if (img.complete) apply();
  img.addEventListener('load', apply);
  new ResizeObserver(apply).observe(frame);
});

// Booking form: submits via FormSubmit (formsubmit.co), which emails the
// request to hello@djcurly.co.uk — no backend needed on this host.
// If that service is unreachable, falls back to opening the visitor's
// email client with the request pre-filled.
document.getElementById('booking-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var form = this;
  var button = form.querySelector('button[type="submit"]');
  var sent = document.getElementById('form-sent');
  var data = new FormData(form);

  var name = data.get('name') || '';
  var email = data.get('email') || '';
  var date = data.get('date') || 'TBC';
  var venue = data.get('venue') || 'TBC';
  var message = data.get('message') || '';

  function showSent() {
    form.reset();
    sent.hidden = false;
    setTimeout(function () { sent.hidden = true; }, 8000);
  }

  function mailtoFallback() {
    var subject = 'Booking request — ' + name;
    var body =
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Event date: ' + date + '\n' +
      'Venue / town: ' + venue + '\n\n' +
      'About the night:\n' + message;
    window.location.href =
      'mailto:hello@djcurly.co.uk?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    showSent();
  }

  button.disabled = true;

  fetch('https://formsubmit.co/ajax/hello@djcurly.co.uk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      _subject: 'Booking request — ' + name,
      _template: 'table',
      Name: name,
      Email: email,
      'Event date': date,
      'Venue / town': venue,
      'About the night': message
    })
  })
    .then(function (res) {
      if (!res.ok) throw new Error('formsubmit ' + res.status);
      return res.json();
    })
    .then(function () { showSent(); })
    .catch(function () { mailtoFallback(); })
    .finally(function () { button.disabled = false; });
});
