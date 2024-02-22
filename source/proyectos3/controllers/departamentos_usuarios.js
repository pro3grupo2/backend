// Dependecias necesarias para el manejo de las rutas de autenticacion
const asig_titu_service = require('../services/departamentos_usuarios')

const get_departamentos_usuarios = async (req, res) => {
    const {body} = req
    return res.send({
        data: await asig_titu_service.get_departamentos_usuarios(body.skip || 0, body.take || 20)
    })
}

const get_departamentos_usuario = async (req, res) => {
    const data = await asig_titu_service.get_departamentos_usuario(parseInt(req.params.idUsuario), parseInt(req.params.idDepartamento))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

const create_departamentos_usuarios = async (req, res) => {
    const {body} = req
    const data = await asig_titu_service.create_departamentos_usuarios(body)

    if (!data) return res.status(400).send({data: "Bad Request"})

    return res.send({
        data: data
    })
}

const update_departamentos_usuarios = async (req, res) => {
    const {body} = req
    const data = await asig_titu_service.update_departamentos_usuarios(parseInt(req.params.idUsuario), parseInt(req.params.idDepartamento), body)

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({
        data: data
    })
}

const delete_departamentos_usuarios = async (req, res) => {
    const data = await asig_titu_service.delete_departamentos_usuarios(parseInt(req.params.idUsuario), parseInt(req.params.idDepartamento))

    if (!data) return res.status(404).send({data: "Not Found"})

    return res.send({data: data})
}

module.exports = {
    get_departamentos_usuarios,
    get_departamentos_usuario,
    create_departamentos_usuarios,
    update_departamentos_usuarios,
    delete_departamentos_usuarios
}