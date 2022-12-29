import axios from '../axios';

const getAllUsers = (data) => {
    return axios.get(`/api/get-all-user?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&isDeleted=${data.isDeleted}`);
};
const createNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data);
};
const UpdateUserService = (data) => {
    return axios.put(`/api/update-user`, data);
};
const DeleteUserService = (ids) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            ids: ids,
        },
    });
};
const handleLoginService = (data) => {
    return axios.post(`/api/login`, data);
};
const SoftDeleteUserService = (data) => {
    return axios.put(`/api/soft-delete-user`, data);
};
const RestoreUserService = (data) => {
    return axios.put(`/api/restore-user`, data);
};
const getDetailUserById = (id) => {
    return axios.get(`/api/get-detail-user-by-id?id=${id}`);
};

export {
    getAllUsers,
    createNewUser,
    getDetailUserById,
    UpdateUserService,
    SoftDeleteUserService,
    RestoreUserService,
    DeleteUserService,
    handleLoginService,
};
