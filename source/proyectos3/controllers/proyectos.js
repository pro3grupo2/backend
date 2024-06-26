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
        const {page, ...resto} = req.MATCHED
        return good_response(res, await proyectos_service.get_proyectos(page, resto))
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
        const {page, ...resto} = req.MATCHED
        return good_response(res, await proyectos_service.get_proyectos(page, {estado: "pendiente", ...resto}))
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
        const {page, ...resto} = req.MATCHED
        return good_response(res, await proyectos_service.get_proyectos(page, {estado: "rechazado", ...resto}))
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
 * Update a specific project by its ID
 * @async
 * @function
 * @param {object} req - Express request object containing the ID of the project to be updated and the new project data
 * @param {object} res - Express response object
 * @returns {Promise<object>} The response object containing the updated project
 * @throws {Error} When there is an error updating the project
 */
const patch_proyecto = async (req, res) => {
    try {
        const {id, ...proyecto} = req.MATCHED
        return good_response(res, await proyectos_service.patch_proyecto(id, proyecto))
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
    patch_proyecto,
    delete_proyecto,
    aceptar_proyecto,
    rechazar_proyecto
}