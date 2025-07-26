import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout'; // Importa el componente Layout

// Importa todas tus páginas
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Usuarios from './pages/Usuarios';
import Tutores from './pages/Tutores';
import Estudiantes from './pages/Estudiantes';
import Clases from './pages/Clases';
import Modulos from './pages/Modulos';
import Notificaciones from './pages/Notificaciones';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas sin layout (ej. Login, Register) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas con layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/tutores" element={<Tutores />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/modulos" element={<Modulos />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
        </Route>

        {/* Puedes agregar rutas de error 404 aquí */}
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
