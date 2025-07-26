import React, { useState, useEffect } from 'react';
import { clasesService } from '../services/clasesService';

const Clases = () => {
  const initial = { id: null, nombre: '', descripcion: '' };
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initial);
  const [editing, setEditing] = useState(false);

  const fetch = async () => {try { const { data } = await clasesService.getAll(); setItems(data); }
    catch { alert('Error cargando clases'); }
  };

  useEffect(() => { fetch(); }, []);

  const change = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.descripcion.trim()) {alert('Campos * son obligatorios'); return;}
    try {editing ? await clasesService.update(form.id, form) : await clasesService.create(form);
      setForm(initial); setEditing(false); fetch();} catch { alert('Error guardando'); }
    };
  const edit = item => { setForm(item); setEditing(true); };
  const remove = async id => {if (confirm('Eliminar?')) { try { await clasesService.remove(id); fetch(); } catch { alert('Error eliminando'); }}};

  return (
    <div><h2>{editing ? 'Editar Clase' : 'Agregar Clase'}</h2><form onSubmit={submit}>
        {['nombre','descripcion'].map(f => (
          <div key={f} className="mb-2">
            <label>{f.charAt(0).toUpperCase()+f.slice(1)} *<input className="form-control" name={f} value={form[f]} onChange={change}/></label></div>
        ))}<button className="btn btn-primary" type="submit">{editing ? 'Actualizar' : 'Guardar'}</button>
      </form>
      <hr />
      <h2>Lista de Clases</h2>
      <table className="table table-striped mt-3">
        <thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
        <tbody>{items.map(i => (
          <tr key={i.id}><td>{i.id}</td><td>{i.nombre}</td><td>{i.descripcion}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => edit(i)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => remove(i.id)}>Eliminar</button>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
};

export default Clases;
