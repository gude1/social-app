import axios from 'axios';
import {store, persistor} from '../store';

const axiosinstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

axiosinstance.interceptors.request.use((config) => {
  config.params = {
    mobile_confirmed: 'ultimatrix',
  };
  return config;
});

export default axiosinstance;
