const {good_response, bad_response} = require("../errors")

const account_services = require("../services/account")

const update = async (req, res) => {
    try {
        return good_response(res, await account_services.update(req.JWT.id, req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    update
}