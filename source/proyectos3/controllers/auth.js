// Dependecias necesarias para el manejo de las rutas de autenticacion
const auth_service = require("../services/auth")
const auth_errors = require("../errors/auth")

// Ruta para manejar el inicio de sesion
const signin = async (req, res) => {
    const {matched_data} = req
    const data = await auth_service.get_usuario_and_verify_password(matched_data.correo, matched_data.password)

    if (!data) return res.status(400).send({
        data: {
            errors: [auth_errors.WRONG_SIGNIN]
        }
    })

    return res.send({
        data: {
            token: data
        }
    })
}

// Ruta para manejar el registro de usuarios
const signup = async (req, res) => {
    const {matched_data} = req
    const data = await auth_service.create_usuario(matched_data)

    if (!data) return res.status(400).send({
        data: {
            errors: [auth_errors.WRONG_SIGNUP]
        }
    })

    return res.send({
        data: data
    })
}

// Ruta para manejar la obtencion de datos de un usuario mediante Bearer Token (JWT)
const me = async (req, res) => {
    return res.send({data: await auth_service.get_usuario_by_id(req.usuario_id)})
}

module.exports = {
    signin, signup, me
}