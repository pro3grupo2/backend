const {good_response, bad_response} = require("../errors");

const titulaciones_service = require('../services/titulaciones')

const get_titulaciones = async (req, res) => {
    try {
        return good_response(res, await titulaciones_service.get_titulaciones(req.MATCHED.skip, req.MATCHED.take))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const get_titulacion = async (req, res) => {
    try {
        return good_response(res, await titulaciones_service.get_titulacion(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const create_titulacion = async (req, res) => {
    try {
        return good_response(res, await titulaciones_service.create_titulacion(req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const update_titulacion = async (req, res) => {
    try {
        const {id, ...resto} = req.MATCHED
        return good_response(res, await titulaciones_service.update_titulacion(id, resto))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    get_titulaciones, get_titulacion, create_titulacion, update_titulacion
}
