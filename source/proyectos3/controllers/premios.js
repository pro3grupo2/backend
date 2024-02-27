// Dependecias necesarias para el manejo de las rutas de autenticacion
const premios_service = require('../services/premios')
const premios_errors = require('../errors/premios')

const get_premios = async (req, res) => {
    const {matched_data} = req
    return res.send({
        data: await premios_service.get_premios(matched_data.skip, matched_data.take)
    })
}

const get_premio = async (req, res) => {
    const data = await premios_service.get_premio(req.matched_data.premio_id)

    if (!data) return res.status(404).send({
        data: {
            errors: [premios_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

const create_premio = async (req, res) => {
    const {matched_data} = req
    const data = await premios_service.create_premio(matched_data)

    if (!data) return res.status(400).send({
        data: {
            errors: [premios_errors.WRONG_CREATE]
        }
    })

    return res.send({
        data: data
    })
}

const update_premio = async (req, res) => {
    const {matched_data} = req

    const premio_id = matched_data.premio_id
    delete matched_data.premio_id

    const data = await premios_service.update_premio(premio_id, matched_data)

    if (!data) return res.status(404).send({
        data: {
            errors: [premios_errors.NOT_FOUND]
        }
    })

    return res.send({
        data: data
    })
}

const delete_premio = async (req, res) => {
    console.log(req.matched_data.premio_id)
    const data = await premios_service.delete_premio(req.matched_data.premio_id)

    if (!data) return res.status(404).send({
        data: {
            errors: [premios_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

module.exports = {
    get_premios, get_premio, create_premio, update_premio, delete_premio
}