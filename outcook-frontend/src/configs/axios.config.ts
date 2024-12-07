import { backend_api } from '@/constants/api';
import axios from 'axios';

const instance = axios.create({
    baseURL: backend_api,
    headers: {'Content-Type': 'application/json'},
    withCredentials : true,
    responseType : 'json'
});

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return error.toString()
});

export default instance;