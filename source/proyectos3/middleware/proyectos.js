const proyectos_service = require("../services/proyectos")

const is_propietario = async (req, res, next) => {
    const {usuario_id} = req
    const {proyecto_id} = req.params

    const proyecto = await proyectos_service.get_proyecto(parseInt(proyecto_id))

    if (!proyecto) return res.status(404).send({data: "Not Found"})

    if (proyecto.id_creador !== usuario_id) return res.status(401).send({data: "Unauthorized"})

    next()
}

module.exports = {
    is_propietario
}