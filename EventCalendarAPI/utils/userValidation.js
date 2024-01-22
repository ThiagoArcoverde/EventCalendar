import bcrypt from 'bcrypt'

class userValidation {

    validateCreationParams(name, password, email) {
        if (name === '' || name === undefined)
            return false
        if (password === '' || password === undefined)
            return false
        if (email === '' || email === undefined)
            return false
        return true
    }

    validateUpdateParams(userId, name, email) {
        if (!this.validateId(userId))
            return false
        if (name === '' || name === undefined)
            return false
        if (email === '' || email === undefined)
            return false
        return true
    }

    async validateLoginPassword(password, insertedPassword) {
        return await bcrypt.compare(password, insertedPassword)
    }

    validateId(id) {
        return !(id === '' || id === undefined || id <= 0)
    }

    validateEmail(email){
        return !(email === '' || email === undefined)
    }

}

export default new userValidation()