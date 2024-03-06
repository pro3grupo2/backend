// Dependecias necesarias para el manejo de las rutas de autenticacion
const asignaturas_service = require('../services/asignaturas')
const asignaturas_errors = require('../errors/asignaturas')
const get_asignaturas = async (req, res) => {
    return res.send({
        data: await asignaturas_service.get_asignaturas(req.MATCHED.skip || 0, req.MATCHED.take || 20)
    })
}

const get_asignatura = async (req, res) => {
    const data = await asignaturas_service.get_asignatura(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [asignaturas_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

const create_asignatura = async (req, res) => {
    const data = await asignaturas_service.create_asignatura(req.MATCHED)

    if (!data) return res.status(400).send({
        data: {
            errors: [asignaturas_errors.WRONG_CREATE]
        }
    })

    return res.send({
        data: data
    })
}

const update_asignatura = async (req, res) => {
    const {MATCHED} = req

    const asignatura_id = MATCHED.id
    delete MATCHED.id

    const data = await asignaturas_service.update_asignatura(asignatura_id, MATCHED)

    if (!data) return res.status(404).send({
        data: {
            errors: [asignaturas_errors.NOT_FOUND]
        }
    })

    return res.send({
        data: data
    })
}

const delete_asignatura = async (req, res) => {
    const data = await asignaturas_service.delete_asignatura(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [asignaturas_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

module.exports = {
    get_asignaturas, get_asignatura, create_asignatura, update_asignatura, delete_asignatura
}