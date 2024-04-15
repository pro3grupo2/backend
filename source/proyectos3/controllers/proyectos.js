const {good_response, bad_response} = require("../errors")

const proyectos_service = require("../services/proyectos")

/**
 * Fetch all projects
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const get_proyectos = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.get_proyectos(req.MATCHED.page, req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Fetch all pending projects
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const get_proyectos_pendientes = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.get_proyectos(req.MATCHED.page, {estado: "pendiente", ...req.MATCHED}))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Fetch all rejected projects
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const get_proyectos_rechazados = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.get_proyectos(req.MATCHED.page, {estado: "rechazado", ...req.MATCHED}))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Fetch all projects of the authenticated user
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const get_me_proyectos = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.get_me_proyectos(req.JWT.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Fetch a project by id
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const get_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.get_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Upload files for a new project
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const create_proyecto_files = async (req, res) => {
    return good_response(res, req.MATCHED)
}

/**
 * Create a new project
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const create_proyecto = async (req, res) => {
    try {
        req.MATCHED.id_creador = req.JWT.id
        return good_response(res, await proyectos_service.create_proyecto(req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Delete a project by id
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const delete_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.delete_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Accept a project by id
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const aceptar_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.aceptar_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Reject a project by id
 * @async
 * @function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const rechazar_proyecto = async (req, res) => {
    try {
        return good_response(res, await proyectos_service.rechazar_proyecto(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    get_proyectos,
    get_proyectos_pendientes,
    get_proyectos_rechazados,
    get_me_proyectos,
    get_proyecto,
    create_proyecto_files,
    create_proyecto,
    delete_proyecto,
    aceptar_proyecto,
    rechazar_proyecto
}