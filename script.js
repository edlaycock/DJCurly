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
