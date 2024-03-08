const proyectos_service = require("../services/proyectos")
const proyectos_errors = require("../errors/proyectos")

const get_proyectos = async (req, res) => {
    const {body} = req
    return res.send({
        data: await proyectos_service.get_proyectos(body.skip, body.take)
    })
}

const get_proyecto = async (req, res) => {
    const data = await proyectos_service.get_proyecto(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [proyectos_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

const create_proyecto_files = async (req, res) => {
    return res.send({
        data: req.MATCHED
    })
}

const create_proyecto = async (req, res) => {
    const {MATCHED, JWT} = req

    MATCHED.id_creador = JWT.id
    const data = await proyectos_service.create_proyecto(MATCHED)

    if (!data) return res.status(400).send({
        data: {
            errors: [proyectos_errors.WRONG_CREATE]
        }
    })

    return res.send({
        data: data
    })
}

const update_proyecto = async (req, res) => {
    const {id, ...proyecto} = req.MATCHED
    const data = await proyectos_service.update_proyecto(id, proyecto)

    if (!data) return res.status(404).send({
        data: {
            errors: [proyectos_errors.NOT_FOUND]
        }
    })

    return res.send({
        data: data
    })
}

const delete_proyecto = async (req, res) => {
    const data = await proyectos_service.delete_proyecto(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [proyectos_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

const validar_proyecto = async (req, res) => {
    const data = await proyectos_service.validar_proyecto(req.MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [proyectos_errors.NOT_FOUND]
        }
    })

    return res.send({data: data})
}

module.exports = {
    get_proyectos, get_proyecto, create_proyecto_files, create_proyecto, update_proyecto, delete_proyecto, validar_proyecto
}