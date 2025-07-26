import api from './api';

export const clasesService = {
  getAll: () => api.get('/clases'),
  getById: (id) => api.get(`/clases/${id}`),
  create: (data) => api.post('/clases', data),
  update: (id, data) => api.put(`/clases/${id}`, data),
  remove: (id) => api.delete(`/clases/${id}`)
};
