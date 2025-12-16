import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ==========
   TOURS API
   ========== */
export const getTours = () => api.get('/tours');
export const getTourById = (id) => api.get(`/tours/${id}`);
export const createTour = (tourData) => api.post('/tours', tourData);
export const updateTour = (id, tourData) => api.put(`/tours/${id}`, tourData);
export const deleteTour = (id) => api.delete(`/tours/${id}`);

/* ==========
   AUTH API
   ========== */
export const loginAdmin = (email, password) =>
  api.post('/auth/login', { email, password });

export default api;
