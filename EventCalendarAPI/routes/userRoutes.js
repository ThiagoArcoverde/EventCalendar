import { Router } from "express";
import authMiddleware from "../middlewares/auth.js"
import userController from "../controller/userController.js";

const userRoutes = Router()

userRoutes.post('/user', userController.create)
userRoutes.post('/login', userController.login)
userRoutes.get('/user/:userId', authMiddleware, userController.getById)
userRoutes.get('/user/email/:email', authMiddleware, userController.getByEmail)
userRoutes.put('/user/changePassword', authMiddleware, userController.changePassword)
userRoutes.put('/user/updateInfo', authMiddleware, userController.updateInfo)

export { userRoutes }