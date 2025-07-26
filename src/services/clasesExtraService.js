import api from './api';

export const clasesExtraService = {
  getAll: () => api.get('/clases-extra'),
  getById: (id) => api.get(`/clases-extra/${id}`),
  create: (data) => api.post('/clases-extra', data),
  update: (id, data) => api.put(`/clases-extra/${id}`, data),
  remove: (id) => api.delete(`/clases-extra/${id}`)
};
