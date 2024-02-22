// Dependecias necesarias para el manejo de las rutas de autenticacion
const departamentos_service = require('../services/departamentos')

const get_departamentos = async (req, res) => {
    const {body} = req
    return res.send({
        data: await departamentos_service.get_departamentos(body.skip || 0, body.take || 20)
    })
}

const get_departamento = async (req, res) => {
    const data = await departamentos_service.get_departamento(parseInt(req.params.departamento_id))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

const create_departamento = async (req, res) => {
    const {body} = req
    const data = await departamentos_service.create_departamento(body)

    if (!data) return res.status(400).send({data: "Bad Request"})

    return res.send({
        data: data
    })
}

const update_departamento = async (req, res) => {
    const {body} = req
    const data = await departamentos_service.update_departamento(parseInt(req.params.departamento_id), body)

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({
        data: data
    })
}

const delete_departamento = async (req, res) => {
    const data = await departamentos_service.delete_departamento(parseInt(req.params.departamento_id))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

module.exports = {
    get_departamentos,
    get_departamento,
    create_departamento,
    update_departamento,
    delete_departamento
}