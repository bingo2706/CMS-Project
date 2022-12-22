import express from 'express';
let router = express.Router();
import userController from '../controllers/userController';
import allcodeController from '../controllers/allcodeController';
import projectController from '../controllers/projectController';

let initwebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send('hello');
    });
    //=====================API USER==========================//
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/update-user', userController.handleUpdateUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/get-all-user', userController.getAllUser);
    router.get('/api/get-detail-user-by-id', userController.getDetailUserById);

    router.put('/api/restore-user', userController.handleRestoreUser);
    router.put('/api/soft-delete-user', userController.handleSoftDeleteUser);
    router.post('/api/login', userController.handleLogin);

    //====================API ALLCODE========================//
    router.get('/api/get-all-code', allcodeController.getAllCodeService);

    //====================API PROJECT========================//
    router.post('/api/create-new-project', projectController.handleCreateNewProject);
    router.put('/api/restore-project', projectController.handleRestoreProject);
    router.put('/api/soft-delete-project', projectController.handleSoftDeleteProject);
    router.delete('/api/delete-project', projectController.handleDeleteProject);
    router.put('/api/update-project', projectController.handleUpdateProject);
    router.get('/api/get-all-project', projectController.getAllProject);
    router.get('/api/get-detail-project-by-id', projectController.getDetailProjectById);
    router.get('/api/get-count-status-order', projectController.getCountStatusProject);
    return app.use('/', router);
};

module.exports = initwebRoutes;
