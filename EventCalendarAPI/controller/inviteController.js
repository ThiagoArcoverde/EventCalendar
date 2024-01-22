import { inviteService } from "../services/inviteService.js";

class inviteController {

    async create(req, res) {
        try {
            const { inviterId, invitedId, eventId } = req.body
            const serviceResponse = await new inviteService().create(inviterId, invitedId, eventId)
            if(serviceResponse.statusCode == 201){
                res.statusCode = serviceResponse.statusCode
                return res.send(serviceResponse.object)
            }
            res.statusCode  = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async accept(req, res) {
        try {
            const { inviteId, invitedId } = req.body
            const serviceResponse = await new inviteService().accept(inviteId, invitedId)
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async decline(req, res) {
        try {
            const { inviteId, invitedId } = req.body
            const serviceResponse = await new inviteService().decline(inviteId, invitedId)
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async getUserInvites(req, res) {
        try {
            const { userId } = req.params
            const serviceResponse = await new inviteService().getUserInvites(userId)
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.object)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

}

export default new inviteController()