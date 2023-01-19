import axios from '../axios/axiosApiGateway';

const getAllAccount = () => {
    return axios.get(`/api/v1/accounts`);
};
export { getAllAccount };
