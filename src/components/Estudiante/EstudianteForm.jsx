import { useState } from 'react';

const EstudianteForm = () => {
  const [form, setForm] = useState({
    nombreEstudiante: '',
    curso: '',
    modulo: '',
    leccion: '',
    idAcudiente: '',
    nombreAcudiente: '',
    telefonoAcudiente: '',
    correoAcudiente: ''
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    const erroresTemp = {};
    if (!form.nombreEstudiante.trim()) erroresTemp.nombreEstudiante = 'Campo obligatorio';
    if (!form.curso.trim()) erroresTemp.curso = 'Campo obligatorio';
    if (!form.modulo.trim()) erroresTemp.modulo = 'Campo obligatorio';
    if (!form.leccion.trim()) erroresTemp.leccion = 'Campo obligatorio';
    if (!form.idAcudiente.trim()) erroresTemp.idAcudiente = 'Campo obligatorio';
    if (!form.nombreAcudiente.trim()) erroresTemp.nombreAcudiente = 'Campo obligatorio';
    if (!form.telefonoAcudiente.trim()) erroresTemp.telefonoAcudiente = 'Campo obligatorio';
    if (!form.correoAcudiente.trim()) erroresTemp.correoAcudiente = 'Campo obligatorio';
    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    console.log('Estudiante registrado:', form);
    setForm({
      nombreEstudiante: '',
      curso: '',
      modulo: '',
      leccion: '',
      idAcudiente: '',
      nombreAcudiente: '',
      telefonoAcudiente: '',
      correoAcudiente: ''
    });
    setErrores({});
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Registrar Estudiante</h5>

      <label>Nombre del Estudiante *</label>
      <input className="form-control mb-1" name="nombreEstudiante" value={form.nombreEstudiante} onChange={handleChange} />
      {errores.nombreEstudiante && <div className="text-danger mb-2">{errores.nombreEstudiante}</div>}

      <label>Curso *</label>
      <input className="form-control mb-1" name="curso" value={form.curso} onChange={handleChange} />
      {errores.curso && <div className="text-danger mb-2">{errores.curso}</div>}

      <label>Módulo *</label>
      <input className="form-control mb-1" name="modulo" value={form.modulo} onChange={handleChange} />
      {errores.modulo && <div className="text-danger mb-2">{errores.modulo}</div>}

      <label>Lección *</label>
      <input className="form-control mb-1" name="leccion" value={form.leccion} onChange={handleChange} />
      {errores.leccion && <div className="text-danger mb-2">{errores.leccion}</div>}

      <label>ID del Acudiente *</label>
      <input className="form-control mb-1" name="idAcudiente" value={form.idAcudiente} onChange={handleChange} />
      {errores.idAcudiente && <div className="text-danger mb-2">{errores.idAcudiente}</div>}

      <label>Nombre del Acudiente *</label>
      <input className="form-control mb-1" name="nombreAcudiente" value={form.nombreAcudiente} onChange={handleChange} />
      {errores.nombreAcudiente && <div className="text-danger mb-2">{errores.nombreAcudiente}</div>}

      <label>Teléfono del Acudiente *</label>
      <input className="form-control mb-1" name="telefonoAcudiente" value={form.telefonoAcudiente} onChange={handleChange} />
      {errores.telefonoAcudiente && <div className="text-danger mb-2">{errores.telefonoAcudiente}</div>}

      <label>Correo del Acudiente *</label>
      <input className="form-control mb-2" type="email" name="correoAcudiente" value={form.correoAcudiente} onChange={handleChange} />
      {errores.correoAcudiente && <div className="text-danger mb-2">{errores.correoAcudiente}</div>}

      <button type="submit" className="btn btn-success">Registrar Estudiante</button>
    </form>
  );
};

export default EstudianteForm;
