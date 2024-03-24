const {good_response, bad_response} = require("../errors")

const auth_service = require("../services/auth")

const signin = async (req, res) => {
    try {
        return good_response(res, await auth_service.signin(req.MATCHED.correo, req.MATCHED.password))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const signup = async (req, res) => {
    try {
        return good_response(res, await auth_service.signup_cache(req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const signup_validate = async (req, res) => {
    try {
        return good_response(res, await auth_service.signup_validate(req.JWT.cache_key))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const me = async (req, res) => {
    try {
        return good_response(res, await auth_service.me(req.JWT.correo))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const recover = async (req, res) => {
    try {
        return good_response(res, await auth_service.recover(req.MATCHED.correo))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    signin, signup, signup_validate, me, recover
}
