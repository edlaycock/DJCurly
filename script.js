// Booking form: opens the visitor's email client with the request pre-filled,
// addressed to hello@djcurly.co.uk (no server required for a static host).
document.getElementById('booking-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = new FormData(this);
  const name = data.get('name') || '';
  const email = data.get('email') || '';
  const date = data.get('date') || 'TBC';
  const venue = data.get('venue') || 'TBC';
  const message = data.get('message') || '';

  const subject = 'Booking request — ' + name;
  const body =
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Event date: ' + date + '\n' +
    'Venue / town: ' + venue + '\n\n' +
    'About the night:\n' + message;

  window.location.href =
    'mailto:hello@djcurly.co.uk?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);

  this.reset();
  const sent = document.getElementById('form-sent');
  sent.hidden = false;
  setTimeout(function () { sent.hidden = true; }, 6000);
});
