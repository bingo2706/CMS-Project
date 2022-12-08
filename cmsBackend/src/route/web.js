import express from "express";
let router = express.Router();
import userController from '../controllers/userController'
import allcodeController from '../controllers/allcodeController'


let initwebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello")
    })
    //=====================API USER==========================//
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/update-user',  userController.handleUpdateUser)
    router.delete('/api/delete-user',  userController.handleDeleteUser)
    router.get('/api/get-all-user',  userController.getAllUser)
    router.get('/api/get-detail-user-by-id', userController.getDetailUserById)

    //====================API ALLCODE========================//
    router.get('/api/get-all-code', allcodeController.getAllCodeService)
    return app.use("/", router);
}

module.exports = initwebRoutes;