import { useState } from 'react';

const TutorForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    pais: '',
    telefono: '',
    correo: '',
    cursos: ''
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    let erroresTemp = {};
    if (!form.nombre.trim()) erroresTemp.nombre = 'Campo obligatorio';
    if (!form.pais.trim()) erroresTemp.pais = 'Campo obligatorio';
    if (!form.telefono.trim()) erroresTemp.telefono = 'Campo obligatorio';
    if (!form.correo.trim()) erroresTemp.correo = 'Campo obligatorio';
    if (!form.cursos.trim()) erroresTemp.cursos = 'Campo obligatorio';
    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    console.log('Tutor registrado:', form);
    setForm({ nombre: '', pais: '', telefono: '', correo: '', cursos: '' });
    setErrores({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Registrar Tutor</h5>

      <label>Nombre completo *</label>
      <input className="form-control mb-1" type="text" name="nombre" value={form.nombre} onChange={handleChange} />
      {errores.nombre && <div className="text-danger mb-2">{errores.nombre}</div>}

      <label>País *</label>
      <input className="form-control mb-1" type="text" name="pais" value={form.pais} onChange={handleChange} />
      {errores.pais && <div className="text-danger mb-2">{errores.pais}</div>}

      <label>Teléfono *</label>
      <input className="form-control mb-1" type="text" name="telefono" value={form.telefono} onChange={handleChange} />
      {errores.telefono && <div className="text-danger mb-2">{errores.telefono}</div>}

      <label>Correo electrónico *</label>
      <input className="form-control mb-1" type="email" name="correo" value={form.correo} onChange={handleChange} />
      {errores.correo && <div className="text-danger mb-2">{errores.correo}</div>}

      <label>Cursos que dicta *</label>
      <input className="form-control mb-1" type="text" name="cursos" placeholder="Ej: SCRATCH, PYTHON" value={form.cursos} onChange={handleChange} />
      {errores.cursos && <div className="text-danger mb-2">{errores.cursos}</div>}

      <button type="submit" className="btn btn-primary">Registrar Tutor</button>
    </form>
  );
};

export default TutorForm;
