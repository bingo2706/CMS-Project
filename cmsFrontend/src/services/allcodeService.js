import axios from '../axios/axios';
const getAllCodeService = (type) => {
    return axios.get(`/api/get-all-code?type=${type}`);
};
export { getAllCodeService };
