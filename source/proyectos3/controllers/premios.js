// Dependecias necesarias para el manejo de las rutas de autenticacion
const premios_service = require('../services/premios')

const get_premios = async (req, res) => {
    const {body} = req
    return res.send({
        data: await premios_service.get_premios(body.skip, body.take)
    })
}

const get_premio = async (req, res) => {
    const data = await premios_service.get_premio(req.params.premio_id)

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

const create_premio = async (req, res) => {
    const {body} = req
    const data = await premios_service.create_premio(body)

    if (!data) return res.status(400).send({data: "Bad Request"})

    return res.send({
        data: data
    })
}

const update_premio = async (req, res) => {
    const {body} = req
    const data = await premios_service.update_premio(parseInt(req.params.premio_id), body)

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({
        data: data
    })
}

const delete_premio = async (req, res) => {
    const data = await premios_service.delete_premio(parseInt(req.params.premio_id))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

module.exports = {
    get_premios,
    get_premio,
    create_premio,
    update_premio,
    delete_premio
}