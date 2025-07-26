import React, { useState, useEffect } from 'react';
import api from '../services/api'; // cliente axios que incluye Authorization
import { useNavigate } from 'react-router-dom';

const UsuariosRegistrados = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/users')
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error(err);
        if (err.response?.status === 401) {
          alert('Por favor inicia sesión');
          navigate('/login');
        } else {
          alert('Error cargando usuarios');
        }
      });
  }, [navigate]);

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Username</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosRegistrados;
