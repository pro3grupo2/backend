// Dependecias necesarias para el manejo de las rutas de autenticacion
const auth_service = require("../services/auth")
const auth_errors = require("../errors/auth")

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
        return res.send({
            data: await auth_service.signup(req.MATCHED)
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
    signin, signup, me
}