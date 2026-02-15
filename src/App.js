import { useReducer } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import BookingPage from './components/BookingPage';
import ConfirmedBooking from './components/ConfirmedBooking';
import { initializeTimes, updateTimes } from './reducers/bookingTimesReducer';

function HomePage() {
  return (
    <main>
      <p>Welcome to Little Lemon. Reserve a table from the navigation.</p>
    </main>
  );
}

function App() {
  const navigate = useNavigate();
  const [availableTimes, dispatchAvailableTimes] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  function submitForm(formData) {
    const success =
      typeof window !== 'undefined' &&
      window.submitAPI &&
      window.submitAPI(formData);
    if (success) {
      navigate('/booking-confirmed');
    }
    return Boolean(success);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Little Lemon</h1>
        <nav aria-label="Main navigation">
          <ul>
            <li>
              <Link to="/" aria-label="Go to home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" aria-label="Go to About Us">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" aria-label="Go to Blog">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/booking" aria-label="Go to Reservations">
                Reservations
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<main><h2>About Us</h2></main>} />
        <Route path="/blog" element={<main><h2>Blog</h2></main>} />
        <Route
          path="/booking"
          element={
            <BookingPage
              availableTimes={availableTimes}
              dispatchAvailableTimes={dispatchAvailableTimes}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </div>
  );
}

export default App;
