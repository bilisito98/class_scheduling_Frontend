// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();        // Borrar token
    navigate('/login'); // Redirigir
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold text-warning" to="/">ClassScheduler</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {token ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/usuarios">Usuarios</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/usuariosregistrados">Usuarios Registrados</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/tutores">Tutores</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/estudiantes">Estudiantes</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/clases">Clases</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/clasesextra">Clases Extra</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/modulos">Módulos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/notificaciones">Notificaciones</Link></li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-warning btn-sm ms-2">Cerrar sesión</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
