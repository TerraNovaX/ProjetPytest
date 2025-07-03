import { useState } from 'react';

export default function UserForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://sils518b8k.execute-api.eu-west-1.amazonaws.com/prod/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    const data = await res.json();
    setMessage(data.message || 'Utilisateur créé');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Créer</button>
      <p>{message}</p>
    </form>
  );
}
