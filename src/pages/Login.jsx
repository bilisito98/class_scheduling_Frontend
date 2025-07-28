// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { setToken } = useAuth(); // ✅ usar contexto correctamente

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (!username || !password) {
      alert('Ingresa usuario y contraseña válidos');
      return;
    }

    try {
      const { data } = await api.post('/auth/login', credentials);
      setToken(data.token); // ✅ actualiza el estado global
      navigate('/dashboard'); // ✅ redirige al dashboard
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error || 'Error del servidor');
        console.error('Backend error:', err.response.data);
      } else {
        console.error('Unexpected error:', err);
        alert('Error inesperado. Intenta de nuevo.');
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Iniciar sesión
        </button>
      </form>
      <p className="mt-3 text-center">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;
