import axios from 'axios';

const axiosinstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/auth/',
});

axiosinstance.interceptors.request.use(config => {
    config.params = {
        mobile_confirmed: "ultimatrix"
    }
    return config;
});

export default axiosinstance;