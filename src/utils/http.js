import axios from 'axios';

const http = axios.create({
  baseURL: '/mall-portal',
  timeout: 5000
});

export default http;
