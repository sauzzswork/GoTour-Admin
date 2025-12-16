import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tours API
export const getTours = () => api.get('/tours');
export const getTourById = (id) => api.get(`/tours/${id}`);
export const createTour = (tourData) => api.post('/tours', tourData);
export const updateTour = (id, tourData) => api.put(`/tours/${id}`, tourData);
export const deleteTour = (id) => api.delete(`/tours/${id}`);

// Auth API
export const loginAdmin = (email, password) =>
  api.post('/auth/login', { email, password });

export default api;
