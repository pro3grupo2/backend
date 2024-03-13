const recuperacion_service = require('../services/recuperacion')
const correoHtml = require('../mailes/correo');
const recuperacion_errors = require("../errors/recuperacion")

const enviarCorreo = async (req, res) => {
    const data = await recuperacion_service.obtenerUsuario(req.MATCHED.correo)

    if (!data) return res.status(400).send({
        data: {
            errors: [recuperacion_errors.NOT_FOUND]
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

    if (!!await recuperacion_service.enviarCorreo(templateParams)) return res.send({
        data: data.correo
    })
    else return res.status(400).send({
        data: {
            errors: [recuperacion_errors.WRONG_SEND]
        }
    })
}

module.exports = {enviarCorreo};
