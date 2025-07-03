import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../UserForm';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Utilisateur créé' })
    })
  );
});

test('envoie un nom et affiche un message', async () => {
  render(<UserForm />);

  // On ne remplit que le champ "name"
  fireEvent.change(screen.getByPlaceholderText(/name/i), {
    target: { value: 'Bob' }
  });

  fireEvent.click(screen.getByText(/Créer/i));

  const message = await screen.findByText(/Utilisateur créé/i);
  expect(message).toBeInTheDocument();
});
