const { body } = require('express-validator');
const { validate } = require('./validation');

const enviarCorreo = [
    body('correo', 'Type: String, Valid Email Required')
        .exists()
        .notEmpty()
        .isString()
        .isEmail()
        .withMessage('Invalid email format'),
    validate
];

module.exports = {
    enviarCorreo
};