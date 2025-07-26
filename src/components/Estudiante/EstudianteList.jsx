import React, { useEffect, useState } from 'react';

const EstudianteList = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/estudiantes')
      .then(res => res.json())
      .then(data => setEstudiantes(data))
      .catch(err => console.error('Error al cargar estudiantes:', err));
  }, []);

  return (
    <div>
      <h2>📋 Lista de Estudiantes</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Curso</th>
            <th>Modulo</th>
            <th>Lección</th>
            <th>Acudiente</th>
            <th>Teléfono</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(est => (
            <tr key={est.Id}>
              <td>{est.Id}</td>
              <td>{est.NombreEstudiante}</td>
              <td>{est.Curso}</td>
              <td>{est.Modulo}</td>
              <td>{est.Leccion}</td>
              <td>{est.NombreAcudiente}</td>
              <td>{est.TelefonoAcudiente}</td>
              <td>{est.CorreoAcudiente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstudianteList;
