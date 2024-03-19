// Dependecias necesarias para el manejo de las rutas de autenticacion
const titulaciones_service = require('../services/titulaciones')
const titulaciones_errors = require('../errors/titulaciones')
const get_titulaciones = async (req, res) => {
    return res.send({
        data: await titulaciones_service.get_titulaciones(req.MATCHED.skip || 0, req.MATCHED.take || 20)
    })
}

const get_titulacion = async (req, res) => {
    const data = await titulaciones_service.get_titulacion(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [titulaciones_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

const create_titulacion = async (req, res) => {
    const data = await titulaciones_service.create_titulacion(req.MATCHED)

    if (!data) return res.status(400).send({
        data: {
            errors: [titulaciones_errors.WRONG_CREATE]
        }
    })

    return res.send({
        data: data
    })
}

const update_titulacion = async (req, res) => {
    const {id, ...datos} = req.MATCHED
    const data = await titulaciones_service.update_titulacion(id, datos)

    if (!data) return res.status(404).send({
        data: {
            errors: [titulaciones_errors.NOT_FOUND]
        }
    })

    return res.send({
        data: data
    })
}

const delete_titulacion = async (req, res) => {
    const data = await titulaciones_service.delete_titulacion(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [titulaciones_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

module.exports = {
    get_titulaciones, get_titulacion, create_titulacion, update_titulacion, delete_titulacion
}