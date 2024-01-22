import { Database } from "../database/database.js"
import userValidation from "../utils/userValidation.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const { sign } = jwt

export class UserService {
    async create(name, password, email) {
        try {
            const validParams = userValidation.validateCreationParams(name, password, email)
            if (!validParams)
                return { statusCode: 400, message: "Invalid params" }
            const hasUser = await Database.user.findOne({ where: { email: email } })
            if (hasUser)
                return { statusCode: 409, message: "User already exists" }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await Database.user.create({ name: name, password: hashedPassword, email: email })
            if (user)
                return { statusCode: 201, message: "User created successfully", userId: user.dataValues.id }

            return { statusCode: 500, message: "Error creating user" }
        } catch (error) {

            return { statusCode: 500, message: error }
        }
    }


    async login(email, password) {
        const user = await Database.user.findOne({ where: { email: email } })
        if (user == undefined) {
            return { statusCode: 404, message: "User not found" }
        }

        const isPasswordValid = await userValidation.validateLoginPassword(password, user.password)
        if (isPasswordValid) {
            const token = sign({ id: user.dataValues.id, email: user.dataValues.email }, process.env.JWT_SECRET, { expiresIn: '24h' })
            return { statusCode: 200, message: "User logged in successfully", token: token, userId: user.dataValues.id }
        }
        return { statusCode: 401, message: "Invalid password" }
    }

    async changePassword(userId, password) {
        try {

            const isIdValid = userValidation.validateId(userId)
            if (!isIdValid)
                return { statusCode: 400, message: "Invalid id" }

            const user = await Database.user.findOne({ where: { id: userId } })
            if (user == undefined) {
                return { statusCode: 404, message: "User not found" }
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await Database.user.update({ password: hashedPassword }, { where: { id: userId } })
            return { statusCode: 201, message: "Password changed successfully" }
        } catch (error) {
            return { statusCode: 500, message: error }
        }

    }

    async getById(userId) {
        try {
            const validParams = userValidation.validateId(userId)
            if (!validParams)
                return { statusCode: 400, message: "Invalid id" }
            const user = await Database.user.findOne({ where: { id: userId } })
            if (!user)
                return { statusCode: 404, message: "User not found" }
            return {
                statusCode: 200, Object: {
                    name: user.dataValues.name,
                    email: user.dataValues.email
                }
            }
        } catch (error) {
            return { statusCode: 500, message: error }
        }
    }

    async updateInfo(userId, name, email) {
        try {
            const validParams = userValidation.validateUpdateParams(userId, name, email)
            if (!validParams)
                return { statusCode: 400, message: "Invalid params" }
            const user = await Database.user.findOne({ where: { id: userId } })
            if (!user)
                return { statusCode: 404, message: "User not found" }
            await Database.user.update({ name: name, email: email }, { where: { id: userId } })
            return { statusCode: 201, message: "User updated successfully" }
        } catch (error) {
            return { statusCode: 500, message: error }
        }
    }

    async getByEmail(email) {
        try {
            const isEmailValid = userValidation.validateEmail(email)
            if (!isEmailValid)
                return { statusCode: 400, message: "Please insert a valid email" }
            const user = await Database.user.findOne({ where: { email: email } })
            if (user)
                return { statusCode: 200, Object: user }
            return { statusCode: 404, message: "User not found" }

        } catch (error) {
            return { statusCode: 500, message: error}
        }
    }

}