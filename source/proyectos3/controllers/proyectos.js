const {good_response, bad_response} = require("../errors")

const proyectos_service = require("../services/proyectos")

const get_proyectos = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.get_proyectos(req.MATCHED.page))
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

const delete_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.delete_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const aceptar_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.aceptar_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const rechazar_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.rechazar_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    get_proyectos, get_proyecto, create_proyecto_files, create_proyecto, delete_proyecto, aceptar_proyecto, rechazar_proyecto
}
