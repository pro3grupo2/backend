const {body, param} = require('express-validator')
const {validate} = require('./validation')


const get_proyecto = [
    param('proyecto_id').toInt(),
    validate
]

const create_proyecto = [
    body('id_asignatura', 'Type: Int').toInt(),
    body('titulo', 'Type: String, Max-Length: 100').isString().notEmpty().isLength({max: 100}),
    body('ficha_tecnica', 'Type: String, Max-Length: None').isString().notEmpty(),
    body('ruta_fichero', 'Type: String, Max-Length: 100').isString().notEmpty().isLength({max: 100}),
    body('ruta_imagen', 'Type: String, Max-Length: 100').isString().notEmpty().isLength({max: 100}),
    validate
]

const update_proyecto = [
    param('proyecto_id').toInt(),
    body('id_asignatura', 'Type: Int').toInt(),
    body('titulo', 'Type: String, Max-Length: 100').isString().notEmpty().isLength({max: 100}),
    body('ficha_tecnica', 'Type: String, Max-Length: None').isString().notEmpty(),
    body('ruta_fichero', 'Type: String, Max-Length: 100').isString().notEmpty().isLength({max: 100}),
    body('ruta_imagen', 'Type: String, Max-Length: 100').isString().notEmpty().isLength({max: 100}),
    validate
]

const delete_proyecto = [
    param('proyecto_id').toInt(),
    validate
]

module.exports = {
    get_proyecto,
    create_proyecto,
    update_proyecto,
    delete_proyecto
}
