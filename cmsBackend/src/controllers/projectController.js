import projectService from '../services/projectService';

let handleCreateNewProject = async (req, res) => {
    try {
        let data = await projectService.handleCreateNewProject(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};
let getAllProject = async (req, res) => {
    try {
        let data = await projectService.getAllProject(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};
let handleSoftDeleteProject = async (req, res) => {
    try {
        let data = await projectService.handleSoftDeleteProject(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};
let handleRestoreProject = async (req, res) => {
    try {
        let data = await projectService.handleRestoreProject(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};
let handleDeleteProject = async (req, res) => {
    try {
        let data = await projectService.handleDeleteProject(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};
let getDetailProjectById = async (req, res) => {
    try {
        let data = await projectService.getDetailProjectById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};
let handleUpdateProject = async (req, res) => {
    try {
        let data = await projectService.handleUpdateProject(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};
let getCountStatusProject = async (req, res) => {
    try {
        let data = await projectService.getCountStatusProject(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server',
        });
    }
};
module.exports = {
    handleCreateNewProject: handleCreateNewProject,
    getAllProject: getAllProject,
    handleRestoreProject: handleRestoreProject,
    handleSoftDeleteProject: handleSoftDeleteProject,
    handleDeleteProject: handleDeleteProject,
    getDetailProjectById: getDetailProjectById,
    handleUpdateProject: handleUpdateProject,
    getCountStatusProject: getCountStatusProject,
};
