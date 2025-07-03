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
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la récupération des utilisateurs");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Le nom est requis");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Utilisateur créé');
        setName('');
        fetchUsers(); // Refresh users
      } else {
        setMessage(data.error || "Erreur lors de la création");
      }
    } catch (err) {
      setMessage("Erreur réseau");
    }
  };

  useEffect(() => {
    fetchUsers();
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

      <h3>Utilisateurs</h3>
      <ul>
        {users.map(user => (
          <li key={user.user_id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
