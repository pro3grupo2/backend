// Dependecias necesarias para el manejo de las rutas de autenticacion
const {get_usuario_and_verify_password, create_usuario, get_usuario_by_id} = require('../services/auth')

// Ruta para manejar el inicio de sesion
const signin = async (req, res) => {
    const {body} = req
    const data = await get_usuario_and_verify_password(body.correo, body.password)

    if (!data) return res.status(401).send({data: "Unauthorized"})

    return res.send({
        data: {
            token: data
        }
    })
}

// Ruta para manejar el registro de usuarios
const signup = async (req, res) => {
    const {body} = req
    const data = await create_usuario(body)

    if (!data) return res.status(400).send({data: "Bad Request"})

    return res.send({
        data: data
    })
}

// Ruta para manejar la obtencion de datos de un usuario mediante Bearer Token (JWT)
const me = async (req, res) => {
    const {id} = req
    return res.send({data: await get_usuario_by_id(id)})
}

module.exports = {
    signin, signup, me
}