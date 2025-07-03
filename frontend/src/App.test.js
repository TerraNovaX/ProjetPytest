import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the form title', () => {
  render(<App />);
  const button = screen.getByText(/Créer/i);
  expect(button).toBeInTheDocument();
});