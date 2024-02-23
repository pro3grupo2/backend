const {body, param} = require('express-validator')
const {validate} = require('./validation')


const get_proyecto = [
    param('proyecto_id').isInt().toInt(),
    validate
]

const create_proyecto = [
    body('id_creador').isInt().toInt(),
    body('id_asignatura').isInt().toInt(),
    body('titulo').isString().notEmpty(),
    body('ficha_tecnica').isString().notEmpty(),
    body('ruta_fichero').isString().notEmpty(),
    body('ruta_imagen').isString().notEmpty(),
    validate
]

const update_proyecto = [
    param('proyecto_id').isInt().toInt(),
    body('id_creador').isInt().toInt(),
    body('id_asignatura').isInt().toInt(),
    body('titulo').isString().notEmpty(),
    body('ficha_tecnica').isString().notEmpty(),
    body('ruta_fichero').isString().notEmpty(),
    body('ruta_imagen').isString().notEmpty(),
    validate
]

const delete_proyecto = [
    param('proyecto_id').isInt().toInt(),
    validate
]

module.exports = {
    get_proyecto,
    create_proyecto,
    update_proyecto,
    delete_proyecto
}
