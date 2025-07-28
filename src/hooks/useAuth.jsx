// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import api from '../services/api';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => localStorage.getItem('token') || null);

  // Actualiza el token en localStorage y headers de axios
  const setToken = (newToken) => {
    setTokenState(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const logout = () => setToken(null);

  const value = useMemo(() => ({ token, setToken, logout }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  return context;
}
