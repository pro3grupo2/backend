const premios_service = require('../services/premios')
const {good_response, bad_response} = require("../errors");

const get_premios = async (req, res) => {
    try {
        return good_response(res, await premios_service.get_premios(req.MATCHED.skip, req.MATCHED.take))
    } catch (e) {
        return bad_response(res, 404, e)
    }
}

const get_premio = async (req, res) => {
    try {
        return good_response(res, await premios_service.get_premio(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 404, e)
    }
}

const create_premio = async (req, res) => {
    try {
        return good_response(res, await premios_service.create_premio(req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const update_premio = async (req, res) => {
    try {
        const {id, ...datos} = req.MATCHED
        return good_response(res, await premios_service.update_premio(id, datos))
    } catch (e) {
        return bad_response(res, 404, e)
    }
}

const delete_premio = async (req, res) => {
    try {
        return good_response(res, await premios_service.delete_premio(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 404, e)
    }
}

module.exports = {
    get_premios, get_premio, create_premio, update_premio, delete_premio
}