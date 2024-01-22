import { Router } from "express";
import authMiddleware from "../middlewares/auth.js"
import eventController from "../controller/eventController.js";

const eventRoutes = Router()

eventRoutes.post('/event',authMiddleware, eventController.create)
eventRoutes.get('/userEvents/:userId',authMiddleware, eventController.getByUserId)
eventRoutes.get('/event/:eventId',authMiddleware, eventController.getEventById)
eventRoutes.get('/event/recents/:userId',authMiddleware, eventController.getRecentEvents)
eventRoutes.get('/allEvents/:userId',authMiddleware, eventController.getAllEvents)
eventRoutes.delete('/event/:eventId',authMiddleware, eventController.delete)
eventRoutes.put('/event/', authMiddleware, eventController.update)

export { eventRoutes }