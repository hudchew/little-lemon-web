import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

const getSubmitButton = () =>
  screen.getByRole('button', { name: /submit reservation/i });

test('Renders static text in BookingForm', () => {
  render(<BookingForm />);
  const labelElement = screen.getByText('Choose date');
  expect(labelElement).toBeInTheDocument();
});

describe('HTML5 validation attributes', () => {
  test('date input has required attribute', () => {
    render(<BookingForm />);
    const dateInput = screen.getByLabelText('Choose date');
    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveAttribute('type', 'date');
  });

  test('time select has required attribute', () => {
    render(<BookingForm />);
    const timeSelect = screen.getByLabelText('Choose time');
    expect(timeSelect).toHaveAttribute('required');
  });

  test('guests input has required, min and max attributes', () => {
    render(<BookingForm />);
    const guestsInput = screen.getByLabelText('Number of guests');
    expect(guestsInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
    expect(guestsInput).toHaveAttribute('type', 'number');
  });
});

describe('JavaScript validation (valid and invalid states)', () => {
  test('submit button is disabled when date is empty (invalid state)', () => {
    render(<BookingForm />);
    expect(getSubmitButton()).toBeDisabled();
  });

  test('submit button is enabled when date is filled (valid state)', () => {
    render(<BookingForm />);
    const dateInput = screen.getByLabelText('Choose date');
    fireEvent.change(dateInput, { target: { value: '2025-03-15' } });
    expect(getSubmitButton()).toBeEnabled();
  });

  test('submitForm is called with form data when form is valid and submitted', () => {
    const submitForm = jest.fn();
    render(<BookingForm submitForm={submitForm} />);
    const dateInput = screen.getByLabelText('Choose date');
    fireEvent.change(dateInput, { target: { value: '2025-03-15' } });
    fireEvent.click(getSubmitButton());
    expect(submitForm).toHaveBeenCalledWith(
      expect.objectContaining({
        date: '2025-03-15',
        time: '17:00',
        guests: 1,
        occasion: 'Birthday',
      })
    );
  });
});
