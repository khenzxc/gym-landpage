import axios from 'axios';

export const API_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
).replace(/\/$/, '');

export const getToken = () => localStorage.getItem('auth_token');

export const apiFetch = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body) headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (response.status === 401) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }
  return response;
};

export const saveSession = ({ token, user }) => {
  localStorage.setItem('auth_token', token);
  localStorage.setItem('auth_user', JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
};

const api = axios.create({
  baseURL: API_URL
});

export default api;