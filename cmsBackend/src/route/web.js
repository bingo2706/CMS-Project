import express from 'express';
let router = express.Router();
import userController from '../controllers/userController';
import allcodeController from '../controllers/allcodeController';
import projectController from '../controllers/projectController';
import middlewareControllers from '../middleware/jwtVerify';
let initwebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send('hello');
    });
    //=====================API USER==========================//
    router.post('/api/create-new-user', middlewareControllers.verifyTokenAdmin, userController.handleCreateNewUser);
    router.put('/api/update-user', middlewareControllers.verifyTokenAdmin, userController.handleUpdateUser);
    router.delete('/api/delete-user', middlewareControllers.verifyTokenAdmin, userController.handleDeleteUser);
    router.get('/api/get-all-user', middlewareControllers.verifyTokenAdmin, userController.getAllUser);
    router.get('/api/get-detail-user-by-id', middlewareControllers.verifyTokenAllRole, userController.getDetailUserById);
    router.get('/api/get-detail-user-by-email', userController.getDetailUserByEmail);

    router.put('/api/restore-user', middlewareControllers.verifyTokenAdmin, userController.handleRestoreUser);
    router.put('/api/soft-delete-user', middlewareControllers.verifyTokenAdmin, userController.handleSoftDeleteUser);
    router.post('/api/login', userController.handleLogin);

    //====================API ALLCODE========================//
    router.get('/api/get-all-code', middlewareControllers.verifyTokenAllRole, allcodeController.getAllCodeService);

    //====================API PROJECT========================//
    router.post('/api/create-new-project', middlewareControllers.verifyTokenAllRole, projectController.handleCreateNewProject);
    router.put('/api/restore-project', middlewareControllers.verifyTokenAllRole, projectController.handleRestoreProject);
    router.put('/api/soft-delete-project', middlewareControllers.verifyTokenAllRole, projectController.handleSoftDeleteProject);
    router.delete('/api/delete-project', middlewareControllers.verifyTokenAllRole, projectController.handleDeleteProject);
    router.put('/api/update-project', middlewareControllers.verifyTokenAllRole, projectController.handleUpdateProject);
    router.get('/api/get-all-project', middlewareControllers.verifyTokenAllRole, projectController.getAllProject);
    router.get('/api/get-detail-project-by-id', middlewareControllers.verifyTokenAllRole, projectController.getDetailProjectById);
    router.get('/api/get-count-status-order', middlewareControllers.verifyTokenAllRole, projectController.getCountStatusProject);
    return app.use('/', router);
};

module.exports = initwebRoutes;
