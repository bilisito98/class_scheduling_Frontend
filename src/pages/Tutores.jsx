// Tutores.jsx
import React, { useEffect, useState } from 'react';
import { tutorService } from '../services/tutorService';

const Tutores = () => {
  const initialForm = {
    id: null,
    nombre: '',
    pais: '',
    telefono: '',
    correo: '',
    cursos: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [tutores, setTutores] = useState([]);
  const [editing, setEditing] = useState(false);

  const fetchTutores = async () => {
    try {
      const { data } = await tutorService.getAll();
      setTutores(data);
    } catch {
      alert('Error cargando tutores');
    }
  };

  useEffect(() => {
    fetchTutores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['nombre', 'pais', 'telefono', 'correo', 'cursos'];
    for (const f of requiredFields) {
      if (!formData[f].trim()) {
        alert(`El campo ${f} es obligatorio`);
        return;
      }
    }

    try {
      if (editing) {
        await tutorService.update(formData.id, formData);
      } else {
        await tutorService.create(formData);
      }
      setFormData(initialForm);
      setEditing(false);
      fetchTutores();
    } catch {
      alert('Error al guardar tutor');
    }
  };

  const handleEdit = (tutor) => {
    setFormData(tutor);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar tutor?')) {
      try {
        await tutorService.remove(id);
        fetchTutores();
      } catch {
        alert('Error eliminando');
      }
    }
  };

  return (
    <div>
      <h2>{editing ? 'Editar Tutor' : 'Agregar Tutor'}</h2>
      <form onSubmit={handleSubmit}>
        {['nombre','pais','telefono','correo','cursos'].map((field) => (
          <div className="mb-2" key={field}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)} * 
              <input
                className="form-control"
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
        <button className="btn btn-primary" type="submit">
          {editing ? 'Actualizar' : 'Guardar'}
        </button>
      </form>

      <hr />

      <h2>Lista de Tutores</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>País</th><th>Teléfono</th><th>Correo</th><th>Cursos</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tutores.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.nombre}</td>
              <td>{t.pais}</td>
              <td>{t.telefono}</td>
              <td>{t.correo}</td>
              <td>{t.cursos}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(t)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tutores;
