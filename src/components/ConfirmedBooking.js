import { Link } from 'react-router-dom';

function ConfirmedBooking() {
  return (
    <main>
      <h1>Booking confirmed</h1>
      <p>Your reservation has been confirmed. We look forward to seeing you!</p>
      <p>
        <Link to="/">Back to home</Link>
        {' · '}
        <Link to="/booking">Make another reservation</Link>
      </p>
    </main>
  );
}

export default ConfirmedBooking;
