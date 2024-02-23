const proyectos_service = require("../services/proyectos")

const get_proyectos = async (req, res) => {
    const {body} = req
    return res.send({
        data: await proyectos_service.get_proyectos(body.skip, body.take)
    })
}

const get_proyecto = async (req, res) => {
    const data = await proyectos_service.get_proyecto(parseInt(req.params.proyecto_id))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

const create_proyecto = async (req, res) => {
    const {body} = req

    const data = await proyectos_service.create_proyecto(body)

    if (!data) return res.status(400).send({data: "Bad Request"})

    return res.send({
        data: data
    })
}

const update_proyecto = async (req, res) => {
    const {body} = req
    const data = await proyectos_service.update_proyecto(req.params.proyecto_id, body)

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({
        data: data
    })
}

const delete_proyecto = async (req, res) => {
    const data = await proyectos_service.delete_proyecto(req.params.proyecto_id)

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

module.exports = {
    get_proyectos,
    get_proyecto,
    create_proyecto,
    update_proyecto,
    delete_proyecto
}