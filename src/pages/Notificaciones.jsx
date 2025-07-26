import React, { useState, useEffect } from 'react';
import { notificacionService } from '../services/notificacionService';

const Notificaciones = () => {
  const initial = { id: null, titulo: '', mensaje: '' };
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState(initial);
  const [editing, setEditing] = useState(false);

  const fetch = async () => {
    try { const { data } = await notificacionService.getAll(); setLista(data); }
    catch { alert('Error cargando notificaciones'); }
  };

  useEffect(() => { fetch(); }, []);

  const change = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!form.titulo.trim() || !form.mensaje.trim()) {
      alert('Campos * son obligatorios'); return;
    }
    try {
      editing ? await notificacionService.update(form.id, form) : await notificacionService.create(form);
      setForm(initial); setEditing(false); fetch();
    } catch { alert('Error guardando'); }
  };

  const edit = n => { setForm(n); setEditing(true); };
  const remove = async id => {
    if (confirm('Eliminar notificación?')) { try { await notificacionService.remove(id); fetch(); } catch { alert('Error eliminando'); }}
  };

  return (
    <div>
      <h2>{editing ? 'Editar Notificación' : 'Agregar Notificación'}</h2>
      <form onSubmit={submit}>
        {['titulo','mensaje'].map(f => (
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
      <h2>Lista de Notificaciones</h2>
      <table className="table table-striped mt-3">
        <thead><tr><th>ID</th><th>Título</th><th>Mensaje</th><th>Acciones</th></tr></thead>
        <tbody>{lista.map(n => (
          <tr key={n.id}>
            <td>{n.id}</td><td>{n.titulo}</td><td>{n.mensaje}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => edit(n)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => remove(n.id)}>Eliminar</button>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
};

export default Notificaciones;
