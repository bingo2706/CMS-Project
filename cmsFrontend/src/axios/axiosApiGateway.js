import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_GATEWAY,
    //  withCredentials: true
});

instance.interceptors.response.use((response) => {
    // Thrown error for request with OK status code

    return response.data;
});

export default instance;
