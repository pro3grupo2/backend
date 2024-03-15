const {body} = require('express-validator')
const {validate} = require('./validation')

const signin = [
    body('correo', 'Type: String, Max-Length: 50').exists().notEmpty().isEmail().isLength({max: 50}),
    body('password', 'Type: String, Max-Length: 200, Hint: La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial').exists().notEmpty().isString().isLength({max: 200}).custom(value => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
    }),
    validate
]

const signup = [
    body('correo', 'Type: String, Max-Length: 50').exists().notEmpty().isEmail().isLength({max: 50}),
    body('nombre_completo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    body('alias', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    body('password', 'Type: String, Max-Length: 200, Hint: La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial').exists().notEmpty().isString().isLength({max: 200}).custom(value => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
    }),
    body('frase_recuperacion', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    body('rol', 'Type: Enum("alumno", "alumni", "profesor", "coordinador", "invitado")').exists().notEmpty().isString().isIn(["alumno", "alumni", "profesor", "coordinador", "invitado"]),
    body('promocion', 'Type: Year (YYYY)').exists().notEmpty().toInt(),
    validate
]

module.exports = {
    signin,
    signup
}
