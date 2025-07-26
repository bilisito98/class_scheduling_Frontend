import api from './api';


export const notificacionService = {
  getAll: () => api.get('/notificaciones'),
  getById: (id) => api.get(`/notificaciones/${id}`),
  create: (data) => api.post('/notificaciones', data),
  update: (id, data) => api.put(`/notificaciones/${id}`, data),
  remove: (id) => api.delete(`/notificaciones/${id}`)
};
