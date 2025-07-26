import React, { useState, useEffect } from 'react';
import { clasesExtraService } from '../services/clasesExtraService';

const ClasesExtra = () => {
  const initial = {
    id: null,
    tutorId: '',
    estudianteId: '',
    fecha: '',
    hora: '',
    descripcion: ''
  };

  const [form, setForm] = useState(initial);
  const [lista, setLista] = useState([]);
  const [editing, setEditing] = useState(false);

  const fetchAll = async () => {
    try {const { data } = await clasesExtraService.getAll();
      setLista(data);
    } catch {alert('Error cargando clases extras');}
  };

  useEffect(() => {fetchAll();}, []);

  const handleChange = (e) => {setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = ['tutorId', 'estudianteId', 'fecha', 'hora', 'descripcion'];
    for (const field of required) {
      if (!form[field]?.toString().trim()) {alert(`El campo ${field} es obligatorio`);
        return;
      }
    }

    try {
      if (editing) {await clasesExtraService.update(form.id, form);} else {await clasesExtraService.create(form);}
      setForm(initial);
      setEditing(false);
      fetchAll();
    } catch {alert('Error al guardar clase extra');}
  };

  const handleEdit = (item) => {setForm(item); setEditing(true);};

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta clase extra?')) {
      try {
        await clasesExtraService.remove(id);
        fetchAll();
      } catch {alert('Error eliminando clase extra');}
    }
  };

  return (
    <div>
      <h2>{editing ? 'Editar Clase Extra' : 'Agregar Clase Extra'}</h2>
      <form onSubmit={handleSubmit}>
        {['tutorId','estudianteId','fecha','hora','descripcion'].map((f) => (
          <div className="mb-2" key={f}>
            <label>
              {f.charAt(0).toUpperCase()+f.slice(1).replace('Id', ' ID')} *
              <input
                className="form-control"
                type={f.includes('Id') ? 'number' : 'text'}
                name={f}
                value={form[f]}
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

      <h2>Lista de Clases Extras</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th><th>Tutor ID</th><th>Estudiante ID</th><th>Fecha</th><th>Hora</th><th>Descripción</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.tutorId}</td>
              <td>{c.estudianteId}</td>
              <td>{c.fecha}</td>
              <td>{c.hora}</td>
              <td>{c.descripcion}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(c)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClasesExtra;
