const {body} = require('express-validator')
const {validate} = require('.')

const password_validator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const update_account = [
    body('nombre_completo', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}).optional(),
    body('password', 'Type: String, Max-Length: 200, Hint: La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial').exists().notEmpty().isString().isLength({max: 200}).custom(value => password_validator.test(value)).optional(),
    body('descripcion', 'Type: String, Max-Length: None').exists().notEmpty().isString().isLength({max: 200}).optional(),
    body('portfolio', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}).optional(),
    body('foto', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}).optional(),
    body('promocion', 'Type: Year (YYYY)').exists().notEmpty().isInt().optional(),
    validate
]

module.exports = {
    update_account
}
