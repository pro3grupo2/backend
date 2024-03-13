// Dependecias necesarias para el manejo de las rutas de autenticacion
const auth_service = require("../services/auth")
const recuperacion_services = require("../services/recuperacion")

// Ruta para manejar el inicio de sesion
const signin = async (req, res) => {
    try {
        return res.send({
            data: {
                token: await auth_service.signin(req.MATCHED.correo, req.MATCHED.password)
            }
        })
    } catch (e) {
        return res.status(400).send({
            data: {
                errors: [e]
            }
        })
    }
}

// Ruta para manejar el registro de usuarios
const signup = async (req, res) => {
    try {
        await recuperacion_services.enviarCorreo({
            subject: "Validacion de cuenta",
            to_email: req.MATCHED.correo,
            message: await auth_service.signup_cache(req.MATCHED)
        })

        return res.send({
            data: "ok"
        })
    } catch (e) {
        return res.status(400).send({
            data: {
                errors: [e]
            }
        })
    }
}

const signup_validate = async (req, res) => {
    try {
        return res.send({
            data: await auth_service.signup(await auth_service.signup_validate(req.JWT.cache_key))
        })
    } catch (e) {
        return res.status(400).send({
            data: {
                errors: [e]
            }
        })
    }
}

// Ruta para manejar la obtencion de datos de un usuario mediante Bearer Token (JWT)
const me = async (req, res) => {
    return res.send({data: await auth_service.me(req.JWT.id)})
}

module.exports = {
    signin, signup, signup_validate, me
}