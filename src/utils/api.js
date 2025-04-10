// src/utils/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
});
export const url = import.meta.env.VITE_BACKEND_URL

