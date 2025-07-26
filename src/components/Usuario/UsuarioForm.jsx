import React, { useState } from 'react';
import styles from './UsuarioForm.module.css'; // Importa estilos específicos para el formulario

const initialForm = {
  Nombre: '',
  Email: '',
  Password_Hash: '',
  Rol: '',
  Fecha_Registro: '', // Se gestionará en formato compatible con input datetime-local
};

// Función auxiliar para formatear fecha ISO a formato YYYY-MM-DDTHH:mm para input datetime-local
const formatDateTimeLocal = (isoString) => {
  if (!isoString) return '';
  const dt = new Date(isoString);
  // Ajuste a formato local de fecha y hora compatible
  const pad = (num) => num.toString().padStart(2, '0');
  const yyyy = dt.getFullYear();
  const mm = pad(dt.getMonth() + 1);
  const dd = pad(dt.getDate());
  const hh = pad(dt.getHours());
  const min = pad(dt.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

const UsuarioForm = ({ onAddUsuario }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.Nombre || !form.Email || !form.Password_Hash || !form.Rol) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Si no se selecciona fecha, poner la fecha actual con formato ISO
    const fechaRegistroISO = form.Fecha_Registro
      ? new Date(form.Fecha_Registro).toISOString()
      : new Date().toISOString();

    // Enviar datos al padre
    onAddUsuario({ ...form, Fecha_Registro: fechaRegistroISO });

    // Reset formulario y error
    setForm(initialForm);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <h3>Registro de Usuario</h3>
      {error && <p className="error-message">{error}</p>}

      <div className={styles.formGroup}>
        <label htmlFor="nombre">Nombre*:</label>
        <input
          type="text"
          id="nombre"
          name="Nombre"
          value={form.Nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email*:</label>
        <input
          type="email"
          id="email"
          name="Email"
          value={form.Email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Contraseña*:</label>
        <input
          type="password"
          id="password"
          name="Password_Hash"
          value={form.Password_Hash}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="rol">Rol*:</label>
        <select
          id="rol"
          name="Rol"
          value={form.Rol}
          onChange={handleChange}
          required
        >
          <option value="">-- Seleccionar Rol --</option>
          <option value="admin">Administrador</option>
          <option value="tutor">Tutor</option>
          <option value="estudiante">Estudiante</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="fechaRegistro">Fecha de Registro:</label>
        <input
          type="datetime-local"
          id="fechaRegistro"
          name="Fecha_Registro"
          value={formatDateTimeLocal(form.Fecha_Registro)}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Registrar Usuario</button>
    </form>
  );
};

export default UsuarioForm;
