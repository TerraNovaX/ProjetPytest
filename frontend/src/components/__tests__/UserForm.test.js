import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../UserForm';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: 'Utilisateur créé' })
    })
  );
});

test('envoie un utilisateur et affiche un message', async () => {
  render(<UserForm />);
  fireEvent.change(screen.getByPlaceholderText(/user_id/i), { target: { value: 'u1' } });
  fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Bob' } });
  fireEvent.click(screen.getByText(/Créer/i));

  const message = await screen.findByText(/Utilisateur créé/i);
  expect(message).toBeInTheDocument();
});
