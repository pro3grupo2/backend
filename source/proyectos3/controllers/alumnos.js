// Dependecias necesarias para el manejo de las rutas de autenticacion
const alumnos_service = require('../services/alumnos')
const alumnos_errors = require('../errors/alumnos')
const get_alumnos = async (req, res) => {
    const {body} = req
    return res.send({
        data: await alumnos_service.get_alumnos(body.skip || 0, body.take || 20)
    })
}

const get_alumno = async (req, res) => {
    const data = await alumnos_service.get_alumno(parseInt(req.params.alumno_id))

    if (!data) return res.status(404).send({
        data: {
            errors: [alumnos_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

const create_alumno = async (req, res) => {
    const {body} = req
    const data = await alumnos_service.create_alumno(body)

    if (!data) return res.status(400).send({
        data: {
            errors: [alumnos_errors.WRONG_CREATE]
        }
    })

    return res.send({
        data: data
    })
}

const update_alumno = async (req, res) => {
    const {body} = req
    const data = await alumnos_service.update_alumno(parseInt(req.params.alumno_id), body)

    if (!data) return res.status(404).send({
        data: {
            errors: [alumnos_errors.NOT_FOUND]
        }
    })

    return res.send({
        data: data
    })
}

const delete_alumno = async (req, res) => {
    const data = await alumnos_service.delete_alumno(parseInt(req.params.alumno_id))

    if (!data) return res.status(404).send({
        data: {
            errors: [alumnos_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

module.exports = {
    get_alumnos,
    get_alumno,
    create_alumno,
    update_alumno,
    delete_alumno
}