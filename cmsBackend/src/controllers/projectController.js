import projectService from '../services/projectService';

let handleCreateNewProject = async (req, res) => {
    try {
        let data = await projectService.handleCreateNewProject(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    handleCreateNewProject:handleCreateNewProject
}