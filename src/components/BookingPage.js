import BookingForm from './BookingForm';

function BookingPage({
  availableTimes,
  dispatchAvailableTimes,
  submitForm,
}) {
  return (
    <main>
      <h1>Reserve a table</h1>
      <p>Complete the form below to make your reservation.</p>
      <p style={{ fontSize: '0.9em', color: 'var(--text-muted, #666)' }}>
        Choose a date to see available times.
      </p>
      <BookingForm
        availableTimes={availableTimes}
        dispatchAvailableTimes={dispatchAvailableTimes}
        submitForm={submitForm}
      />
    </main>
  );
}

export default BookingPage;
