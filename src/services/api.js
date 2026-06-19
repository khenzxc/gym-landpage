import axios from 'axios';

const api = axios.create({
  // Dito mo ilalagay ang URL ng Render backend mo
  baseURL: 'https://danbhels-gym-backend.onrender.com'
});

export default api;