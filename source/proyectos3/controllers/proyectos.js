const proyectos_service = require("../services/proyectos")
const {good_response, bad_response} = require("../errors");

const get_proyectos = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.get_proyectos(req.MATCHED.skip, req.MATCHED.take))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const get_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.get_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const create_proyecto_files = async (req, res) => {
    return good_response(res, req.MATCHED)
}

const create_proyecto = async (req, res) => {
    try {
        req.MATCHED.id_creador = req.JWT.id
        return good_response(res, await proyectos_service.create_proyecto(req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const update_proyecto = async (req, res) => {
    try {
        const {id, ...proyecto} = req.MATCHED
        return good_response(res, await proyectos_service.update_proyecto(id, proyecto))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const delete_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.delete_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const validar_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.validar_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    get_proyectos, get_proyecto, create_proyecto_files, create_proyecto, update_proyecto, delete_proyecto, validar_proyecto
}