const {good_response, bad_response} = require("../errors")

const codigos_service = require('../services/codigos')

/**
 * Fetch all codes
 * @async
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {Promise<object>} The response object
 */
const get_codigos = async (req, res) => {
    try {
        return good_response(res, await codigos_service.get_codigos())
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Create a new code
 * @async
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {Promise<object>} The response object
 */
const create_codigo = async (req, res) => {
    try {
        req.MATCHED.codigo = Math.floor(100000 + Math.random() * 900000).toString();
        return good_response(res, await codigos_service.create_codigo(req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

/**
 * Delete a specific code by its ID
 * @async
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {Promise<object>} The response object
 */
const delete_codigo = async (req, res) => {
    try {
        return good_response(res, await codigos_service.delete_codigo(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    get_codigos, create_codigo, delete_codigo
}