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
      <BookingForm
        availableTimes={availableTimes}
        dispatchAvailableTimes={dispatchAvailableTimes}
        submitForm={submitForm}
      />
    </main>
  );
}

export default BookingPage;
