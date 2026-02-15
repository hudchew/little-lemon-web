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
    if (
      typeof window !== 'undefined' &&
      window.submitAPI &&
      window.submitAPI(formData)
    ) {
      navigate('/booking-confirmed');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Little Lemon</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/booking">Reservations</Link>
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
