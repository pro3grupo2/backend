// Dependecias necesarias para el manejo de las rutas de autenticacion
const auth_service = require("../services/auth")
const auth_errors = require("../errors/auth")

// Ruta para manejar el inicio de sesion
const signin = async (req, res) => {
    const {MATCHED} = req
    const data = await auth_service.signin(MATCHED.correo, MATCHED.password)

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
    const {MATCHED} = req
    const data = await auth_service.signup(MATCHED)

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
    return res.send({data: await auth_service.me(req.JWT.id)})
}

module.exports = {
    signin, signup, me
}