class eventValidation {

    validateEventParams(title, description, initialDate, finalDate, userId) {
        if (title == '' || title === undefined || title.length == 0)
            return false
        if (description == '' || description == undefined || description.length == 0)
            return false
        if (initialDate == '' || initialDate == undefined)
            return false
        if (finalDate == '' || finalDate == undefined)
            return false
        if (userId == '' || userId == undefined)
            return false
        return true
    }

    validateId(id) {
        return !(id === '' || id === undefined || id <= 0)
    }

}

export default new eventValidation()