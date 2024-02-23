const {body} = require('express-validator')
const {validate} = require('./validation')

const signin = [
    body('correo').isEmail().notEmpty(),
    body('password').isString().notEmpty(),
    validate
]

const signup = [
    body('correo').isEmail().notEmpty(),
    body('nombre_completo').isString().notEmpty(),
    body('alias').isString().notEmpty(),
    body('password').isString().notEmpty(),
    body('frase_recuperacion').isString().notEmpty(),
    validate
]

module.exports = {
    signin,
    signup
}
