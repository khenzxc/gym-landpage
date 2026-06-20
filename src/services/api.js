import axios from 'axios';

const api = axios.create({
  // Kung may VITE_API_URL sa env, gamitin yun. 
  // Kung wala (halimbawa, nakalimutan mo sa .env), default sa localhost:5000
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

export default api;