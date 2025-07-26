import api from './api';

export const estudianteService = {
  getAll: () => api.get('/estudiantes'),
  getById: (id) => api.get(`/estudiantes/${id}`),
  create: (data) => api.post('/estudiantes', data),
  update: (id, data) => api.put(`/estudiantes/${id}`, data),
  remove: (id) => api.delete(`/estudiantes/${id}`)
};
