const {good_response, bad_response} = require("../errors");

const asignaturas_service = require('../services/asignaturas')

const get_asignaturas = async (req, res) => {
    try {
        return good_response(res, await asignaturas_service.get_asignaturas())
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const get_asignatura = async (req, res) => {
    try {
        return good_response(res, await asignaturas_service.get_asignatura(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const create_asignatura = async (req, res) => {
    try {
        return good_response(res, await asignaturas_service.create_asignatura(req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const update_asignatura = async (req, res) => {
    try {
        const {id, ...resto} = req.MATCHED
        return good_response(res, await asignaturas_service.update_asignatura(id, resto))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    get_asignaturas, get_asignatura, create_asignatura, update_asignatura
}
