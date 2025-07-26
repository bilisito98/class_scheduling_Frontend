// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import { AuthProvider, useAuth, login, getToken } from './hooks/useAuth';
import { ProtectedRoute } from './routes/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import UsuariosRegistrados from './pages/UsuariosRegistrados';
import Tutores from './pages/Tutores';
import Estudiantes from './pages/Estudiantes';
import Clases from './pages/Clases';
import ClasesExtra from './pages/ClasesExtra';
import Modulos from './pages/Modulos';
import Notificaciones from './pages/Notificaciones';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/usuariosregistrados" element={<UsuariosRegistrados />} />
              <Route path="/tutores" element={<Tutores />} />
              <Route path="/estudiantes" element={<Estudiantes />} />
              <Route path="/clases" element={<Clases />} />
              <Route path="/clasesextra" element={<ClasesExtra />} />
              <Route path="/modulos" element={<Modulos />} />
              <Route path="/notificaciones" element={<Notificaciones />} />
            </Route>

            {/* Ruta fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
