class inviteValidation{

    validateId(id){
        return !(id === '' || id === undefined || id <= 0)
    }

}

export default new inviteValidation()