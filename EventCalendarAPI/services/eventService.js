import { Database } from "../database/database.js";
import { Op } from "sequelize";
import eventValidation from "../utils/eventValidation.js";
import userValidation from "../utils/userValidation.js";

export class EventService {

    async create(title, description, initialDate, finalDate, userId) {
        try {
            const validParams = eventValidation.validateEventParams(title, description, initialDate, finalDate, userId)
            if (!validParams)
                return { statusCode: 400, message: "Invalid params" }

            const hasEvent = await Database.event.findOne({
                where: {
                    [Op.and]: [
                        { initialDate: { [Op.between]: [initialDate, finalDate] } },
                        { finalDate: { [Op.between]: [initialDate, finalDate] } }
                    ]
                }
            })
            if (hasEvent)
                return { statusCode: 409, message: "There is already an event in this period" }

            const event = await Database.event.create({
                title: title, description: description,
                initialDate: initialDate, finalDate: finalDate, userId: userId
            })
            if (event)
                return { statusCode: 201, message: "Event created successfully", Object: event }

            return { statusCode: 500, message: "Error creating event" }
        } catch (error) {
            return { statusCode: 500, message: error }
        }
    }

    async delete(eventId) {
        try {
            const validParams = eventValidation.validateId(eventId)
            if (!validParams)
                return { statusCode: 400, message: "Invalid id" }
            const event = await Database.event.findOne({ where: { id: eventId } })
            if (!event)
                return { statusCode: 404, message: "Event not found" }
            await Database.event.destroy({ where: { id: eventId } })
            return { statusCode: 201, message: "Event deleted successfully" }
        } catch (error) {
            return { statusCode: 500, message: error }
        }
    }

    async update(title, description, initialDate, finalDate, eventId) {
        try {
            const event = await Database.event.findOne({ where: { id: eventId } })
            if (!event)
                return { statusCode: 404, message: "Event not found" }
            await Database.event.update({
                title: title, description: description,
                initialDate: initialDate, finalDate: finalDate
            }, { where: { id: eventId } })
            return { statusCode: 201, message: "Event updated successfully" }

        } catch (error) {
            return { statusCode: 500, message: error }
        }
    }

    async getEventById(eventId) {
        try {
            const isIdValid = eventValidation.validateId(eventId)
            if (!isIdValid)
                return { statusCode: 400, message: "Invalid id" }

            const event = await Database.event.findOne({ where: { id: eventId } })
            if (event)
                return { statusCode: 200, Object: event }
            return { statusCode: 404, message: "Event not found" }
        } catch (error) {
            return { statusCode: 500, message: error }
        }
    }

    async getByUserId(userId) {
        try {
            const isIdValid = userValidation.validateId(userId)
            if (!isIdValid) {
                return { statusCode: 400, message: "Invalid id" }
            }

            const events = await Database.event.findAll({ where: { userId: userId } })
            if (events.length > 0)
                return { statusCode: 200, Object: events }
            return { statusCode: 404, message: "Events not found" }

        } catch (error) {
            return { statusCode: 500, message: error }
        }
    }

    async getRecentEvents(userId) {
        try {
            const isIdValid = userValidation.validateId(userId)
            if (!isIdValid)
                return { statusCode: 400, message: "Invalid id" }

            var events = []

            const eventsInvited = await Database.invite.findAll({ where: { invitedId: userId } })
            if (eventsInvited) {
                for (let i = 0; i < eventsInvited.length; i++) {
                    const event = await Database.event.findOne({ where: { id: eventsInvited[i].eventId } })
                    if (event && event.dataValues.initialDate > Date.now())
                        events.push(event)
                }
            }

            const eventsCreated = await Database.event.findAll({ where: { userId: userId } })
            if (eventsCreated) {
                for (let i = 0; i < eventsCreated.length; i++) {
                    if (eventsCreated[i].dataValues.initialDate > Date.now())
                        events.push(eventsCreated[i])
                }
            }

            //order events by date
            events.sort(function (a, b) {
                return a.dataValues.initialDate - b.dataValues.initialDate;
            });

            //get first 3 events using for
            var recentEvents = {}
            for (let i = 0; i < 3; i++) {
                if (events[i])
                    recentEvents.push(events[i])
            }

            if (recentEvents.length > 1)
                return { statusCode: 200, Object: recentEvents }
            return { statusCode: 404, message: "Events not found" }

        } catch (error) {
            return { statusCode: 500, message: error }
        }
    }

    async getAllEvents(userId) {
        try {
            const events = await Database.event.findAll({ where: { userId: userId } })
            events.sort(function (a, b) {
                return a.dataValues.initialDate - b.dataValues.initialDate;
            });
            if (events)
                return { statusCode: 200, Object: events };
            return { statusCode: 404, message: "Events not found" }
        } catch (error) {
            return { statusCode: 500, message: error }
        }
    }

}