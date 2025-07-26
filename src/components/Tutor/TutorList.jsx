import { useState } from 'react';

const TutorList = () => {
  const [tutores, setTutores] = useState([
    {
      id: 1,
      nombre: 'Laura Mendoza',
      pais: 'Colombia',
      telefono: '3115558888',
      correo: 'laura@example.com',
      cursos: 'SCRATCH, PYTHON'
    }
  ]);

  return (
    <div>
      <h5>Lista de Tutores</h5>
      <ul className="list-group">
        {tutores.map((tutor) => (
          <li key={tutor.id} className="list-group-item">
            <strong>{tutor.nombre}</strong> ({tutor.pais}) <br />
            📞 {tutor.telefono} | ✉️ {tutor.correo} <br />
            🧑‍🏫 Cursos: {tutor.cursos}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorList;
