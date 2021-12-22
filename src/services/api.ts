import axio from 'axios';

const api = axio.create({
  baseURL: 'http://127.0.0.1:3333'
});

export default api;