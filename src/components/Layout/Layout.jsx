import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.brand}>
          <Link to="/dashboard">ClasesExtraVSC</Link>
        </div>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/usuarios">Usuarios</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/tutores">Tutores</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/estudiantes">Estudiantes</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/clases">Clases</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/modulos">Módulos</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/notificaciones">Notificaciones</Link>
          </li>
          {/* Aquí puedes agregar un botón de Logout o info de usuario */}
          <li className={styles.navItem}>
            <Link to="/login" className={styles.loginButton}>Login</Link>
          </li>
        </ul>
      </nav>
      <main className={styles.mainContent}>
        {children} {/* Aquí se renderizará el contenido de las páginas */}
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} ClasesExtraVSC App. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
