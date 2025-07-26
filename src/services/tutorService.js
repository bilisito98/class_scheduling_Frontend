// tutorService.js
import api from './api';

export const tutorService = {
  getAll: () => api.get('/tutores'),
  getById: (id) => api.get(`/tutores/${id}`),
  create: (data) => api.post('/tutores', data),
  update: (id, data) => api.put(`/tutores/${id}`, data),
  remove: (id) => api.delete(`/tutores/${id}`)
};
