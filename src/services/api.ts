import axio from 'axios';

const api = axio.create({
  baseURL: 'http://127.0.0.1:3333' // Android: 'http://10.0.2.2:3333'
});

export default api;