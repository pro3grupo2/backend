const crypto = require("crypto")

const {good_response, bad_response} = require("../errors")

const codigos_service = require('../services/codigos')

const get_codigos = async (req, res) => {
    try {
        return good_response(res, await codigos_service.get_codigos())
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const create_codigo = async (req, res) => {
    try {
        req.MATCHED.codigo = Math.floor(100000 + Math.random() * 900000).codigo.toString();
        return good_response(res, await codigos_service.create_codigo(req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    get_codigos, create_codigo
}
