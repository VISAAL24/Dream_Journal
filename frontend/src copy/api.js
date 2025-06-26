// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // For cookies/JWT (if using auth)
});

// Auth
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

// Dreams
export const getDreams = () => api.get('/dreams');
export const createDream = (dream) => api.post('/dreams', dream);