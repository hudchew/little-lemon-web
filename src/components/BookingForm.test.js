import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

test('Renders static text in BookingForm', () => {
  render(<BookingForm />);
  const labelElement = screen.getByText('Choose date');
  expect(labelElement).toBeInTheDocument();
});
