import axios from '../axios';
const createNewProject = (data) => {
    return axios.post(`/api/create-new-project`, data);
};
const getAllProjects = (data) => {
    return axios.get(`/api/get-all-project?limit=${data.limit}&offset=${data.offset}&keyword=${data.keyword}&isDeleted=${data.isDeleted}`);
};
const SoftDeleteProjectService = (data) => {
    return axios.put(`/api/soft-delete-project`, data);
};
const RestoreProjectService = (data) => {
    return axios.put(`/api/restore-project`, data);
};
const DeleteProjectService = (ids) => {
    return axios.delete(`/api/delete-project`, {
        data: {
            ids: ids,
        },
    });
};
const getDetailProjectById = (id) => {
    return axios.get(`/api/get-detail-project-by-id?id=${id}`);
};
const UpdateProjectService = (data) => {
    return axios.put(`/api/update-project`, data);
};
const getCountStatusProject = () => {
    return axios.get(`/api/get-count-status-order`);
};
export {
    createNewProject,
    getAllProjects,
    SoftDeleteProjectService,
    RestoreProjectService,
    DeleteProjectService,
    getDetailProjectById,
    UpdateProjectService,
    getCountStatusProject,
};
