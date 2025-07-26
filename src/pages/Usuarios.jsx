import React, { useState } from 'react';
import UsuarioForm from '../components/Usuario/UsuarioForm';
import UsuarioList from '../components/Usuario/UsuarioList';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Este estado simula tus datos de usuarios

  const addUsuario = (usuario) => {
    // Generar un ID único (temporal hasta que uses una DB real)
    const newUsuario = { ...usuario, Usuario_ID: Date.now().toString() };
    setUsuarios((prev) => [...prev, newUsuario]);
    console.log('Usuario agregado:', newUsuario);
  };

  return (
    <div className="page-container">
      <h1>Gestión de Usuarios</h1>
      <UsuarioForm onAddUsuario={addUsuario} />
      <UsuarioList usuarios={usuarios} />
    </div>
  );
};

export default Usuarios;
