const {body} = require('express-validator')
const {validate} = require('./validation')

const update_account = [
    body('nombre_completo', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}).optional(),
    body('password', 'Type: String, Max-Length: 200, Hint: La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial').exists().notEmpty().isString().isLength({max: 200}).custom(value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)).optional(),
    body('frase_recuperacion', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    body('rol', 'Type: Enum("alumno", "alumni", "profesor", "coordinador", "invitado")').exists().notEmpty().isString().isIn(["alumno", "alumni", "profesor", "coordinador", "invitado"]).optional(),
    body('promocion', 'Type: Year (YYYY)').exists().notEmpty().isInt().optional(),
    validate
]

module.exports = {
    update_account
}
