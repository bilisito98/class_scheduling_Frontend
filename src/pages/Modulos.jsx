import React, { useState, useEffect } from 'react';
import { moduloService } from '../services/moduloService';

const Modulos = () => {
  const initial = { id: null, nombre: '', descripcion: '' };
  const [modulos, setModulos] = useState([]);
  const [form, setForm] = useState(initial);
  const [editing, setEditing] = useState(false);

  const fetch = async () => {
    try { const { data } = await moduloService.getAll(); setModulos(data); }
    catch { alert('Error cargando módulos'); }
  };

  useEffect(() => { fetch(); }, []);

  const change = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.descripcion.trim()) {
      alert('Campos * son obligatorios'); return;
    }
    try {
      editing ? await moduloService.update(form.id, form) : await moduloService.create(form);
      setForm(initial); setEditing(false); fetch();
    } catch { alert('Error guardando'); }
  };

  const edit = m => { setForm(m); setEditing(true); };
  const remove = async id => {
    if (confirm('Eliminar módulo?')) { try { await moduloService.remove(id); fetch(); } catch { alert('Error eliminando'); }}
  };

  return (
    <div>
      <h2>{editing ? 'Editar Módulo' : 'Agregar Módulo'}</h2>
      <form onSubmit={submit}>
        {['nombre','descripcion'].map(f => (
          <div key={f} className="mb-2">
            <label>
              {f.charAt(0).toUpperCase()+f.slice(1)} *
              <input className="form-control" name={f} value={form[f]} onChange={change}/>
            </label>
          </div>
        ))}
        <button className="btn btn-primary" type="submit">{editing ? 'Actualizar' : 'Guardar'}</button>
      </form>
      <hr />
      <h2>Lista de Módulos</h2>
      <table className="table table-striped mt-3">
        <thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
        <tbody>{modulos.map(m => (
          <tr key={m.id}>
            <td>{m.id}</td><td>{m.nombre}</td><td>{m.descripcion}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => edit(m)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => remove(m.id)}>Eliminar</button>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
};

export default Modulos;
