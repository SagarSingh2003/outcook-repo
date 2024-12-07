import { backend_api } from '@/constants/api';
import axios from 'axios';

const instance = axios.create({
    baseURL: backend_api,
    headers: {'Content-Type': 'application/json'},
    withCredentials : true,
    responseType : 'json'
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.toString()
});

export default instance;