// Dependecias necesarias para el manejo de las rutas de autenticacion
const departamentos_service = require('../services/departamentos')
const departamentos_errors = require('../errors/departamentos')
const get_departamentos = async (req, res) => {
    return res.send({
        data: await departamentos_service.get_departamentos(req.MATCHED.skip || 0, req.MATCHED.take || 20)
    })
}

const get_departamento = async (req, res) => {
    const data = await departamentos_service.get_departamento(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [departamentos_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

const create_departamento = async (req, res) => {
    const data = await departamentos_service.create_departamento(req.MATCHED)

    if (!data) return res.status(400).send({
        data: {
            errors: [departamentos_errors.WRONG_CREATE]
        }
    })

    return res.send({
        data: data
    })
}

const update_departamento = async (req, res) => {
    const {id, ...datos} = req.MATCHED
    const data = await departamentos_service.update_departamento(id, datos)

    if (!data) return res.status(404).send({
        data: {
            errors: [departamentos_errors.NOT_FOUND]
        }
    })

    return res.send({
        data: data
    })
}

const delete_departamento = async (req, res) => {
    const data = await departamentos_service.delete_departamento(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [departamentos_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

module.exports = {
    get_departamentos, get_departamento, create_departamento, update_departamento, delete_departamento
}