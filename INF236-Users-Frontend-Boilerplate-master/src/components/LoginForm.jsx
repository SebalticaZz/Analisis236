import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para manejar la submisión del formulario (puedes llamar a una función prop, etc.)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Contraseña:</label>
      <input
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
