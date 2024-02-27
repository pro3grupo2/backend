const {body} = require('express-validator')
const {validate} = require('./validation')

const signin = [
    body('correo', 'Type: String, Max-Length: 50').exists().notEmpty().isEmail().isLength({max: 50}),
    body('password', 'Type: String, Max-Length: 102').exists().notEmpty().isString().isLength({max: 102}),
    validate
]

const signup = [
    body('correo', 'Type: String, Max-Length: 50').exists().notEmpty().isEmail().isLength({max: 50}),
    body('nombre_completo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    body('alias', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    body('password', 'Type: String, Max-Length: 102').exists().notEmpty().isString().isLength({max: 102}),
    body('frase_recuperacion', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    validate
]

module.exports = {
    signin,
    signup
}
