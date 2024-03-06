// Dependecias necesarias para el manejo de las rutas de autenticacion
const asig_titu_service = require('../services/asignaturas_titulaciones')

const get_asignaturas_titulaciones = async (req, res) => {
    const {body} = req
    return res.send({
        data: await asig_titu_service.get_asignaturas_titulaciones(body.skip || 0, body.take || 20)
    })
}

const get_asignaturas_titulacion = async (req, res) => {
    const data = await asig_titu_service.get_asignaturas_titulacion(parseInt(req.params.idAsignatura), parseInt(req.params.idTitulacion))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

const create_asignaturas_titulaciones = async (req, res) => {
    const {body} = req
    const data = await asig_titu_service.create_asignaturas_titulaciones(body)

    if (!data) return res.status(400).send({data: "Bad Request"})

    return res.send({
        data: data
    })
}

const update_asignaturas_titulaciones = async (req, res) => {
    const {body} = req
    const data = await asig_titu_service.update_asignaturas_titulaciones(parseInt(req.params.idAsignatura), parseInt(req.params.idTitulacion), body)

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({
        data: data
    })
}

const delete_asignaturas_titulaciones = async (req, res) => {
    const data = await asig_titu_service.delete_asignaturas_titulaciones(parseInt(req.params.idAsignatura), parseInt(req.params.idTitulacion))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

module.exports = {
    get_asignaturas_titulaciones,
    get_asignaturas_titulacion,
    create_asignaturas_titulaciones,
    update_asignaturas_titulaciones,
    delete_asignaturas_titulaciones
}