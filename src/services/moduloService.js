import api from './api';

export const moduloService = {
  getAll: () => api.get('/modulos'),
  getById: (id) => api.get(`/modulos/${id}`),
  create: (data) => api.post('/modulos', data),
  update: (id, data) => api.put(`/modulos/${id}`, data),
  remove: (id) => api.delete(`/modulos/${id}`)
};
