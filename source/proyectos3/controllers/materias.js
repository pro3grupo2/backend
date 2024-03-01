// Dependecias necesarias para el manejo de las rutas de autenticacion
const materias_service = require('../services/materias')
const materias_errors = require('../errors/materias')
const get_materias = async (req, res) => {
    const {body} = req
    return res.send({
        data: await materias_service.get_materias(body.skip || 0, body.take || 20)
    })
}

const get_materia = async (req, res) => {
    const data = await materias_service.get_materia(parseInt(req.params.materia_id))

    if (!data) return res.status(404).send({
        data: {
            errors: [materias_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

const create_materia = async (req, res) => {
    const {body} = req
    const data = await materias_service.create_materia(body)

    if (!data) return res.status(400).send({
        data: {
            errors: [materias_errors.WRONG_CREATE]
        }
    })

    return res.send({
        data: data
    })
}

const update_materia = async (req, res) => {
    const {body} = req
    const data = await materias_service.update_materia(parseInt(req.params.materia_id), body)

    if (!data) return res.status(404).send({
        data: {
            errors: [materias_errors.NOT_FOUND]
        }
    })

    return res.send({
        data: data
    })
}

const delete_materia = async (req, res) => {
    const data = await materias_service.delete_materia(parseInt(req.params.materia_id))

    if (!data) return res.status(404).send({
        data: {
            errors: [materias_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

module.exports = {
    get_materias,
    get_materia,
    create_materia,
    update_materia,
    delete_materia
}