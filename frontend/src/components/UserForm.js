import { useState, useEffect } from 'react';

export default function UserForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  const API_URL = 'https://sils518b8k.execute-api.eu-west-1.amazonaws.com/prod/user';

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://sils518b8k.execute-api.eu-west-1.amazonaws.com/prod/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (!res.ok) throw new Error('Erreur API');

      const data = await res.json();
      setMessage(data.message || 'Utilisateur créé');
    } catch (error) {
      setMessage('Erreur lors de la création');
    }
  };

  useEffect(() => {
    fetchUsers(); // Charger les utilisateurs dès le chargement du composant
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Créer</button>
      </form>

      <p>{message}</p>

      <h3>Utilisateurs :</h3>
      <ul>
        {users.map(user => (
          <li key={user.user_id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
