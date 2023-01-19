import axios from 'axios';

import { IDENTITY_PROVIDER } from '../utils/constant';
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,

    //  withCredentials: true
});
if (localStorage.getItem(IDENTITY_PROVIDER.ID_TOKEN)) {
    instance.interceptors.request.use(
        (config) => {
            config.headers.authorization = 'Bearer ' + localStorage.getItem(IDENTITY_PROVIDER.ID_TOKEN).replaceAll('"', '');

            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );
}

instance.interceptors.response.use((response) => {
    // Thrown error for request with OK status code

    return response.data;
});

export default instance;
