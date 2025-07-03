// frontend/src/components/UserForm.js
import { useState } from 'react';

export default function UserForm() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://arn:aws:apigateway:eu-west-1::/apis/sils518b8k/routes/pxw2227/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, name })
    });
    const data = await res.json();
    setMessage(data.message || 'Utilisateur créé');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="user_id" value={userId} onChange={e => setUserId(e.target.value)} />
      <input placeholder="name" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Créer</button>
      <p>{message}</p>
    </form>
  );
}
