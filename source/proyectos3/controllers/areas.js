// Dependecias necesarias para el manejo de las rutas de autenticacion
const areas_service = require('../services/areas')
const areas_errors = require('../errors/areas')

const get_areas = async (req, res) => {
    return res.send({
        data: await areas_service.get_areas(req.MATCHED.skip, req.MATCHED.take)
    })
}

const get_area = async (req, res) => {
    const data = await areas_service.get_area(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [areas_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

const create_area = async (req, res) => {
    const data = await areas_service.create_area(req.MATCHED)

    if (!data) return res.status(400).send({
        data: {
            errors: [areas_errors.WRONG_CREATE]
        }
    })

    return res.send({
        data: data
    })
}

const update_area = async (req, res) => {
    const {id, ...datos} = req.MATCHED
    const data = await areas_service.update_area(id, datos)

    if (!data) return res.status(404).send({
        data: {
            errors: [areas_errors.NOT_FOUND]
        }
    })

    return res.send({
        data: data
    })
}

const delete_area = async (req, res) => {
    const data = await areas_service.delete_area(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [areas_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

module.exports = {
    get_areas, get_area, create_area, update_area, delete_area
}