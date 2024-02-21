// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_proyectos = async (skip = 0, take = 20) => {
    return prisma.proyectos.findMany(
        {
            skip: skip,
            take: take
        }
    );
}

const get_proyecto = async (proyecto_id) => {
    return prisma.proyectos.findUnique({
        where: {
            id: proyecto_id
        }
    })
}

const create_proyecto = async (proyecto) => {
    try {
        return await prisma.proyectos.create({
            data: {
                id_creador: proyecto.id_creador,
                id_asignatura: proyecto.id_asignatura,
                titulo: proyecto.titulo,
                ficha_tecnica: proyecto.ficha_tecnica,
                ruta_fichero: proyecto.ruta_fichero,
                ruta_imagen: proyecto.ruta_imagen
            }
        })
    } catch (e) {
        return null
    }
}

const update_proyecto = async (proyecto_id, proyecto_nuevo) => {
    try {
        return await prisma.proyectos.update({
            where: {
                id: proyecto_id
            }, data: {
                id_creador: proyecto_nuevo.id_creador,
                id_asignatura: proyecto_nuevo.id_asignatura,
                titulo: proyecto_nuevo.titulo,
                ficha_tecnica: proyecto_nuevo.ficha_tecnica,
                ruta_fichero: proyecto_nuevo.ruta_fichero,
                ruta_imagen: proyecto_nuevo.ruta_imagen
            }
        })
    } catch (e) {
        return null
    }
}

const delete_proyecto = async (proyecto_id) => {
    try {
        return await prisma.proyectos.delete({
            where: {
                id: proyecto_id
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_proyectos,
    get_proyecto,
    create_proyecto,
    update_proyecto,
    delete_proyecto
}