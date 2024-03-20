const {good_response, bad_response} = require("../errors");

const areas_service = require('../services/areas')

const get_areas = async (req, res) => {
    try {
        return good_response(res, await areas_service.get_areas(req.MATCHED.skip, req.MATCHED.take))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const get_area = async (req, res) => {
    try {
        return good_response(res, await areas_service.get_area(req.MATCHED.id))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const create_area = async (req, res) => {
    try {
        return good_response(res, await areas_service.create_area(req.MATCHED))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const update_area = async (req, res) => {
    try {
        const [id, ...resto] = req.MATCHED
        return good_response(res, await areas_service.update_area(id, resto))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

module.exports = {
    get_areas, get_area, create_area, update_area
}
