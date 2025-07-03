import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../UserForm';

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (!options) {
      // GET /user → liste d'utilisateurs
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { user_id: 'u1', name: 'Alice' },
          { user_id: 'u2', name: 'Bob' }
        ])
      });
    } else if (options.method === 'POST') {
      // POST /user → création d'un utilisateur
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Utilisateur créé', user_id: 'u3' })
      });
    }
  });
  jest.clearAllMocks();
});

test('crée un utilisateur et recharge la liste', async () => {
  render(<UserForm />);

  // Remplir le champ
  fireEvent.change(screen.getByPlaceholderText(/name/i), {
    target: { value: 'Charlie' }
  });

  fireEvent.click(screen.getByText(/Créer/i));

  // Attente du message de succès
  const message = await screen.findByText(/Utilisateur créé/i);
  expect(message).toBeInTheDocument();

  // Vérifie que les noms sont affichés
  await waitFor(() => {
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();
  });
});
