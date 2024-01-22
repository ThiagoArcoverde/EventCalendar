import { EventService } from "../services/eventService.js";

class eventController {

    async create(req, res) {
        try {
            const { title, description, initialDate, finalDate, userId } = req.body
            console.log(initialDate, finalDate)
            const serviceResponse = await new EventService().create(title, description, initialDate, finalDate, userId)
            if (serviceResponse.statusCode == 201) {
                res.statusCode = serviceResponse.statusCode
                return res.send(serviceResponse.Object)
            }
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async update(req, res) {
        try {
            const { title, description, initialDate, finalDate, eventId } = req.body
            const serviceResponse = await new EventService().update(title, description, initialDate, finalDate, eventId)
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {

        }
    }

    async delete(req, res) {
        try {
            const { eventId } = req.params
            const serviceResponse = await new EventService().delete(eventId)
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async getEventById(req, res){
        try {
            const { eventId } = req.params
            const serviceResponse = await new EventService().getEventById(eventId)
            if (serviceResponse.statusCode == 200) {
                res.statusCode = serviceResponse.statusCode
                return res.send(serviceResponse.Object)
            }
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async getByUserId(req, res) {
        try {
            const { userId } = req.params
            const serviceResponse = await new EventService().getByUserId(userId)

            if (serviceResponse.statusCode == 200) {
                res.statusCode = serviceResponse.statusCode
                return res.send(serviceResponse.Object)
            }
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }


    async getRecentEvents(req, res){
        try {
            const { userId } = req.params
            const serviceResponse = await new EventService().getRecentEvents(userId)
            if (serviceResponse.statusCode == 200) {
                res.statusCode = serviceResponse.statusCode
                return res.send(serviceResponse.Object)
            }
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async getAllEvents(req, res){
        try {
            const userId = req.params.userId
            const serviceResponse = await new EventService().getAllEvents(userId)
            if (serviceResponse.statusCode == 200) {
                res.statusCode = serviceResponse.statusCode
                return res.send(serviceResponse.Object)
            }
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }
    

}

export default new eventController()