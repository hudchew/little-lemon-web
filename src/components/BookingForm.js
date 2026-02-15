import { useState } from 'react';

const defaultTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

function BookingForm({
  availableTimes = defaultTimes,
  dispatchAvailableTimes,
  submitForm,
}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(defaultTimes[0]);
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [submitError, setSubmitError] = useState('');

  const isFormValid =
    date.trim() !== '' && guests >= 1 && guests <= 10 && time.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    const formData = { date, time, guests, occasion };
    if (submitForm) {
      const success = submitForm(formData);
      if (!success) {
        setSubmitError('Reservation could not be submitted. Please try again.');
      }
    } else if (
      typeof window !== 'undefined' &&
      window.submitAPI &&
      window.submitAPI(formData)
    ) {
      console.log('Reservation submitted:', formData);
    }
  };

  return (
    <form
      style={{ display: 'grid', maxWidth: '200px', gap: '20px' }}
      onSubmit={handleSubmit}
      aria-label="Table reservation form"
    >
      <label htmlFor="res-date">Choose date</label>
      {!date.trim() && (
        <span role="status" style={{ fontSize: '0.85em', color: '#666' }}>
          Please choose a date to continue.
        </span>
      )}
      <input
        type="date"
        id="res-date"
        value={date}
        required
        onChange={(e) => {
          const newDate = e.target.value;
          setDate(newDate);
          if (dispatchAvailableTimes) dispatchAvailableTimes(newDate);
        }}
      />
      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        required
        onChange={(e) => setTime(e.target.value)}
      >
        {availableTimes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        value={guests}
        required
        aria-label="Number of guests"
        onChange={(e) => {
          const v = Number(e.target.value);
          if (!Number.isNaN(v)) setGuests(Math.min(10, Math.max(1, v)));
        }}
      />
      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
      {submitError && (
        <p role="alert" style={{ color: '#c00', fontSize: '0.9em', margin: 0 }}>
          {submitError}
        </p>
      )}
      <input
        type="submit"
        value="Make Your reservation"
        disabled={!isFormValid}
        aria-label="Submit reservation"
      />
    </form>
  );
}

export default BookingForm;
