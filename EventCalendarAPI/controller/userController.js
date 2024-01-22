import { UserService } from "../services/userService.js";

class userController {

    async create(req, res) {
        try {
            const { name, password, email } = req.body
            const serviceResponse = await new UserService().create(name, password, email)
            console.log(password)
            res.statusCode = serviceResponse.statusCode
            res.send({ message: serviceResponse.message, userId: serviceResponse.userId })

        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            console.log(password)
            const serviceResponse = await new UserService().login(email, password)
            if (serviceResponse.statusCode == 200) {
                res.statusCode = serviceResponse.statusCode
                return res.send({ message: serviceResponse.message, userId: serviceResponse.userId, token: serviceResponse.token })
            }
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async changePassword(req, res) {
        try {
            const { userId, password } = req.body
            const serviceResponse = await new UserService().changePassword(userId, password)
            if (serviceResponse.statusCode == 201) {
                res.statusCode = serviceResponse.statusCode
                return res.send(serviceResponse.message)
            }
            res.statusCode = serviceResponse.statusCode
            res.send(serviceResponse.message)
        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async getById(req, res) {
        try {
            const { userId } = req.params
            const serviceResponse = await new UserService().getById(userId)
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

    async updateInfo(req, res) {
        const { userId, name, email } = req.body
        try {
            const serviceResponse = await new UserService().updateInfo(userId, name, email)
            res.statusCode = serviceResponse.statusCode
            return res.send(serviceResponse.message)

        } catch (error) {
            res.statusCode = 500
            res.send(error)
        }
    }

    async getByEmail(req, res) {
        const email = req.params.email
        try {
            const serviceResponse = await new UserService().getByEmail(email)
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

export default new userController()