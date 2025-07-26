import React from 'react';
import styles from './UsuarioList.module.css'; // Importa los estilos específicos para la lista

const UsuarioList = ({ usuarios }) => {
  if (!usuarios || usuarios.length === 0) {
    return <p className={styles.noUsersMessage}>No hay usuarios registrados aún.</p>;
  }

  return (
    <div className={styles.listContainer}>
      <h3>Usuarios Registrados</h3>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Fecha de Registro</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, i) => (
            <tr key={u.Usuario_ID || i}>
              <td>{u.Nombre}</td>
              <td>{u.Email}</td>
              <td>{u.Rol}</td>
              <td>{new Date(u.Fecha_Registro).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioList;
