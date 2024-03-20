const {body} = require('express-validator')
const {validate} = require('./validation')

const password_validator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const signin = [
    body('correo', 'Type: String, Max-Length: 200').exists().notEmpty().isEmail().isLength({max: 200}),
    body('password', 'Type: String, Max-Length: 200, Hint: La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial').exists().notEmpty().isString().isLength({max: 200}).custom(value => password_validator.test(value)),
    validate
]

const signup = [
    body('correo', 'Type: String, Max-Length: 200').exists().notEmpty().isEmail().isLength({max: 200}),
    body('alias', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}),
    body('nombre_completo', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}),
    body('password', 'Type: String, Max-Length: 200, Hint: La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial').exists().notEmpty().isString().isLength({max: 200}).custom(value => password_validator.test(value)),
    body('descripcion', 'Type: String, Max-Length: None').exists().notEmpty().isString().isLength({max: 200}),
    body('portfolio', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}),
    body('foto', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}),
    body('rol', 'Type: Enum("alumno", "alumni", "profesor", "coordinador", "externo")').exists().notEmpty().isString().isIn(["alumno", "alumni", "profesor", "coordinador", "externo"]),
    body('promocion', 'Type: Year (YYYY)').exists().notEmpty().isInt().optional(),
    validate
]

const recover = [
    body('correo', 'Type: String, Max-Length: 200').exists().notEmpty().isEmail().isLength({max: 200}),
    validate
]

module.exports = {
    signin,
    signup,
    recover
}
