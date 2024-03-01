const {body, param} = require('express-validator')
const {validate} = require('./validation')

const get_alumno = [
    param('alumno_id', 'Type: Int').exists().toInt(),
    validate
]

const create_alumno = [
    body('id_usuario', 'Type: Int').exists().toInt(),
    body('id_titulacion', 'Type: Int').exists().toInt(),
    body('promocion', 'Type: Int').exists().toInt(),
    validate
]

const update_alumno = [
    param('alumno_id', 'Type: Int').exists().toInt(),
    body('id_usuario', 'Type: Int').exists().toInt().optional(),
    body('id_titulacion', 'Type: Int').exists().toInt().optional(),
    body('promocion', 'Type: Int').exists().toInt().optional(),
    validate
]

const delete_alumno = [
    param('alumno_id', 'Type: Int').exists().toInt(),
    validate
]

module.exports = {
    get_alumno,
    create_alumno,
    update_alumno,
    delete_alumno
}
