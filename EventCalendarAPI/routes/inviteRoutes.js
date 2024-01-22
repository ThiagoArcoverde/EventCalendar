import { Router } from "express";
import authMiddleware from "../middlewares/auth.js"
import inviteController from "../controller/inviteController.js"

const inviteRoutes = Router()

inviteRoutes.post('/invite',authMiddleware, inviteController.create)
inviteRoutes.post('/invite/accept',authMiddleware, inviteController.accept)
inviteRoutes.post('/invite/decline',authMiddleware, inviteController.decline)
inviteRoutes.get('/userInvites/:userId',authMiddleware, inviteController.getUserInvites)

export { inviteRoutes }