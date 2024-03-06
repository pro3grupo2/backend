// Dependecias necesarias para el manejo de las rutas de autenticacion
const asig_titu_service = require('../services/asignaturas_materias')

const get_asignaturas_materias = async (req, res) => {
    const {body} = req
    return res.send({
        data: await asig_titu_service.get_asignaturas_materias(body.skip || 0, body.take || 20)
    })
}

const get_asignaturas_materia = async (req, res) => {
    const data = await asig_titu_service.get_asignaturas_materia(parseInt(req.params.idAsignatura), parseInt(req.params.idMateria))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

const create_asignaturas_materia = async (req, res) => {
    const {body} = req
    const data = await asig_titu_service.create_asignaturas_materia(body)

    if (!data) return res.status(400).send({data: "Bad Request"})

    return res.send({
        data: data
    })
}

const update_asignaturas_materia = async (req, res) => {
    const {body} = req
    const data = await asig_titu_service.update_asignaturas_materia(parseInt(req.params.idAsignatura), parseInt(req.params.idMateria), body)

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({
        data: data
    })
}

const delete_asignaturas_materia = async (req, res) => {
    const data = await asig_titu_service.delete_asignaturas_materia(parseInt(req.params.idAsignatura), parseInt(req.params.idMateria))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

module.exports = {
    get_asignaturas_materias,
    get_asignaturas_materia,
    create_asignaturas_materia,
    update_asignaturas_materia,
    delete_asignaturas_materia
}