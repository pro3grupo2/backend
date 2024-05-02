const {good_response, bad_response} = require("../errors")

const users_services = require("../services/usuarios")

const get_users = async (req, res) => {
    try {
        return good_response(res, await users_services.get_users(req.MATCHED.page))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const get_user_by_id = async (req, res) => {
    try {
        return good_response(res, await users_services.get_user_by_id(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const get_user_by_correo = async (req, res) => {
    try {
        return good_response(res, await users_services.get_user_by_correo(req.MATCHED.param))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    get_users,
    get_user_by_id,
    get_user_by_correo
}