// Dependecias necesarias para el manejo de las rutas de autenticacion
const auth_service = require("../services/auth")
const correoHtml = require('../mailes/correo')
const {good_response, bad_response} = require("../errors")
const auth_errors = require("../errors/auth")

// Ruta para manejar el inicio de sesion
const signin = async (req, res) => {
    try {
        return good_response(res, await auth_service.signin(req.MATCHED.correo, req.MATCHED.password))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

// Ruta para manejar el registro de usuarios
const signup = async (req, res) => {
    try {
        return good_response(res, await recuperacion_services.enviarCorreo({
            subject: "Validacion de cuenta", to_email: req.MATCHED.correo, message: await auth_service.signup_cache(req.MATCHED)
        }))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const signup_validate = async (req, res) => {
    try {
        return good_response(res, await auth_service.signup_validate(req.JWT.cache_key))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

// Ruta para manejar la obtencion de datos de un usuario mediante Bearer Token (JWT)
const me = async (req, res) => {
    try {
        return good_response(res, await auth_service.me(req.JWT.correo))
    } catch (e) {
        return bad_response(res, 400, e)
    }
}

const recover = async (req, res) => {
    const data = await auth_service.get_data_by_correo(req.MATCHED.correo)

    if (!data) return res.status(400).send({
        data: {
            errors: [auth_errors.NOT_FOUND]
        }
    })

    const htmlContent = correoHtml.correoHtml;

    const mensaje = htmlContent
        .replace('{{nombre_completo}}', data.nombre_completo)
        .replace(/{{to_link}}/g, "https://www.google.com");

    const templateParams = {
        subject: "Recuperacion contraseña repositorio utad",
        to_email: data.correo,
        message: mensaje
    };

    if (!!await auth_service.recover(templateParams)) return res.send({
        data: data.correo
    })
    else return res.status(400).send({
        data: {
            errors: [auth_errors.WRONG_SEND]
        }
    })
}

module.exports = {
    signin, signup, signup_validate, me, recover
}