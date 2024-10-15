import React, { useState } from 'react';
import './Registro.css';

function Registro({ setRegisteredUsers }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validaciones adicionales
    if (!username || !email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Limpiar el mensaje de error
    setError(null);

    // Agregar nuevo usuario a la lista de usuarios registrados
    setRegisteredUsers(prevUsers => [...prevUsers, { username, password }]);
    
    alert('Registro exitoso');
    
    // Limpiar los campos del formulario
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="registro-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="username">Nombre de Usuario</label>
          <input 
            id="username"
            type="text" 
            value={username} 
            onChange={event => setUsername(event.target.value)}
            placeholder='Ingrese su usuario'
          />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={event => setEmail(event.target.value)} 
            placeholder='Ingrese su correo'
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Contraseña</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={event => setPassword(event.target.value)} 
            placeholder='Ingrese su contraseña'
          />
        </div>
        <div className="input-field">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input 
            id="confirmPassword"
            type="password" 
            value={confirmPassword} 
            onChange={event => setConfirmPassword(event.target.value)} 
            placeholder='Confirme su contraseña'
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">Registrarme</button>
      </form>
    </div>
  );
}

export default Registro;
