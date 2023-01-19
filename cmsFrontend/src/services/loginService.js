import axios from '../axios/axiosLogin';
const getAccessToken = (data) => {
    return axios.post(`/oidc/token`, data);
};

export { getAccessToken };
