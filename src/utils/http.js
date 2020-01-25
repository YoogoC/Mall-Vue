import axios from 'axios';

const http = axios.create({
  baseURL: '0.0.0.0:8201/mall-portal/',
  timeout: 5000
});

export default http;
