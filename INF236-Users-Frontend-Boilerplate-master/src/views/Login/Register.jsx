// src/components/Register.js

import React, { useState } from 'react';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando al backend:", { nombre, email, username, password });
    try {
    const response = await fetch('http://localhost:8080/auth/register', { // Asegúrate de que la URL sea correcta
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email, username, password }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nombre de Usuario" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;