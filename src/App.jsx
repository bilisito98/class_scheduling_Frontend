// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Páginas
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <Navigate to="/dashboard" />
                </div>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <Dashboard />
                </div>
              </>
            }
          />
          <Route
            path="/usuarios"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <Usuarios />
                </div>
              </>
            }
          />
          <Route
            path="/usuariosregistrados"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <UsuariosRegistrados />
                </div>
              </>
            }
          />
          <Route
            path="/tutores"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <Tutores />
                </div>
              </>
            }
          />
          <Route
            path="/estudiantes"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <Estudiantes />
                </div>
              </>
            }
          />
          <Route
            path="/clases"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <Clases />
                </div>
              </>
            }
          />
          <Route
            path="/clasesextra"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <ClasesExtra />
                </div>
              </>
            }
          />
          <Route
            path="/modulos"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <Modulos />
                </div>
              </>
            }
          />
          <Route
            path="/notificaciones"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <Notificaciones />
                </div>
              </>
            }
          />
        </Route>

        {/* Ruta fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
