import { Database } from "../database/database.js";
import userValidation from "../utils/userValidation.js";
import eventValidation from "../utils/eventValidation.js";
import inviteValidation from "../utils/inviteValidation.js";


export class inviteService {
    async create(inviterId, invitedId, eventId) {
        try {
            const isInviterIdValid = userValidation.validateId(inviterId)
            const isInvitedIdValid = userValidation.validateId(invitedId)
            const isEventIdValid = eventValidation.validateId(eventId)
            if (!isInviterIdValid || !isInvitedIdValid || !isEventIdValid)
                return { statusCode: 400, message: "Invalid id" }

            const hasInvite = await Database.invite.findOne({ where: { invitedId: invitedId, eventId: eventId } })
            if (hasInvite) {
                return { statusCode: 400, message: "This user is already invited to this event." }
            }

            const invite = await Database.invite.create({ inviterId: inviterId, invitedId: invitedId, eventId: eventId })
            return { statusCode: 201, object: invite }
        } catch (error) {
            return { statusCode: 500, message: error.message }
        }
    }

    async accept(inviteId, invitedId) {
        try {
            const isInviteIdValid = inviteValidation.validateId(inviteId)
            const isInvitedIdValid = userValidation.validateId(invitedId)
            if (!isInviteIdValid || !isInvitedIdValid)
                return { statusCode: 400, message: "Invalid id" }

            const invite = await Database.invite.findOne({ where: { id: inviteId, invitedId: invitedId } })
            if (!invite) {
                return { statusCode: 404, message: "Invite not found" }
            }
            const event = await Database.event.findOne({ where: { id: invite.eventId } })
            if (!event) {
                return { statusCode: 404, message: "Event not found" }
            }
            if (event.dataValues.initialDate < Date.now()) {
                return { statusCode: 400, message: "Event already happened or started" }
            }

            await Database.invite.update({ accepted: true }, { where: { id: inviteId } })
            return { statusCode: 201, message: "Invite accepted" }
        } catch (error) {
            return { statusCode: 500, message: error.message }
        }
    }

    async decline(inviteId, invitedId) {
        try {
            const isInviteIdValid = inviteValidation.validateId(inviteId)
            const isInvitedIdValid = userValidation.validateId(invitedId)
            if (!isInviteIdValid || !isInvitedIdValid)
                return { statusCode: 400, message: "Invalid id" }

            const invite = await Database.invite.findOne({ where: { id: inviteId, invitedId: invitedId } })
            if (!invite) {
                return { statusCode: 404, message: "Invite not found" }
            }

            await Database.invite.destroy({ where: { id: inviteId } })
            return { statusCode: 201, message: "Invite declined" }
        } catch (error) {
            return { statusCode: 500, message: error.message }
        }
    }

    async getUserInvites(userId) {
        try {
            const isUserIdValid = userValidation.validateId(userId)
            if (!isUserIdValid)
                return { statusCode: 400, message: "Invalid id" }

            let invites = await Database.invite.findAll({ where: { invitedId: userId, accepted: false } })
            if (!invites)
                return { statusCode: 404, message: "Invites not found" }
            invites = await Promise.all(invites.map(async (invite) => {
                const event = await Database.event.findOne({ where: { id: invite.eventId } })
                invite.dataValues.event = event
                return invite
            }))
            return { statusCode: 200, object: invites }
        } catch (error) {
            return { statusCode: 500, message: error.message }
        }

    }

}