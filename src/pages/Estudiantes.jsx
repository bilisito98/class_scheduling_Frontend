// Estudiantes.jsx
import React, { useState, useEffect } from 'react';
import { estudianteService } from '../services/estudianteService';

const Estudiantes = () => {
  const initialForm = {
    id: null,
    nombreEstudiante: '',
    curso: '',
    modulo: '',
    leccion: '',
    idAcudiente: '',
    nombreAcudiente: '',
    telefonoAcudiente: '',
    correoAcudiente: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [estudiantes, setEstudiantes] = useState([]);
  const [editing, setEditing] = useState(false);

  const fetchEstudiantes = async () => {try {const { data } = await estudianteService.getAll(); setEstudiantes(data);
    } catch {alert('Error cargando estudiantes');}
  };

  useEffect(() => {fetchEstudiantes();}, []);

  const handleChange = (e) => {setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validaciones básicas
    const required = [
      'nombreEstudiante',
      'curso',
      'modulo',
      'leccion',
      'idAcudiente',
      'nombreAcudiente',
      'telefonoAcudiente',
      'correoAcudiente'
    ];
    for (const field of required) {if (!formData[field].trim()) {alert(`El campo ${field} es obligatorio`);
        return;
      }
    }

    try {
      if (editing) {await estudianteService.update(formData.id, formData);} else {await estudianteService.create(formData);}
      setFormData(initialForm);
      setEditing(false);
      fetchEstudiantes();
    } catch {alert('Error al guardar estudiante');}
  };

  const handleEdit = (e) => {setFormData(e); setEditing(true);};

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar estudiante?')) {
      try {await estudianteService.remove(id);fetchEstudiantes();} catch {alert('Error eliminando estudiante');}
    }
  };

  return (
    <div>
      <h2>{editing ? 'Editar Estudiante' : 'Agregar Estudiante'}</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([field, value]) => {
          const label = field
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, s => s.toUpperCase());
          if (field === 'id') return null;
          return (
            <div className="mb-2" key={field}>
              <label>
                {label} * 
                <input
                  className="form-control"
                  name={field}
                  value={value}
                  onChange={handleChange}
                />
              </label>
            </div>
          );
        })}
        <button className="btn btn-primary" type="submit">{editing ? 'Actualizar' : 'Guardar'}</button>
      </form>

      <hr />

      <h2>Lista de Estudiantes</h2><table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Estudiante</th>
            <th>Curso</th>
            <th>Módulo</th>
            <th>Lección</th>
            <th>ID Acudiente</th>
            <th>Nombre Acudiente</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{estudiantes.map((es) => (
            <tr key={es.id}>
              <td>{es.id}</td>
              <td>{es.nombreEstudiante}</td>
              <td>{es.curso}</td>
              <td>{es.modulo}</td>
              <td>{es.leccion}</td>
              <td>{es.idAcudiente}</td>
              <td>{es.nombreAcudiente}</td>
              <td>{es.telefonoAcudiente}</td>
              <td>{es.correoAcudiente}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(es)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(es.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estudiantes;
