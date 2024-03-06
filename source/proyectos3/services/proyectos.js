// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_proyectos = async (skip = 0, take = 20) => {
    return prisma.proyectos.findMany(
        {
            skip: skip,
            take: take,
            include: {
                usuarios: {
                    select: {
                        id: true,
                        correo: true,
                        nombre_completo: true,
                        alias: true
                    }
                },
                proyectos_premios: {
                    select: {
                        premios: true,
                        anio: true
                    }
                }
            }
        }
    );
}

const get_proyecto = async (id) => {
    return prisma.proyectos.findUnique({
        where: {
            id: id
        },
        include: {
            usuarios_proyectos: {
                select: {
                    usuarios: true
                }
            },
            usuarios: {
                select: {
                    id: true,
                    correo: true,
                    nombre_completo: true,
                    alias: true,
                    rol: true
                }
            },
            proyectos_premios: {
                select: {
                    premios: true
                }
            }
        }
    })
}

const create_proyecto = async (proyecto) => {
    try {
        return await prisma.proyectos.create({
            data: proyecto
        })
    } catch (e) {
        return null
    }
}

const update_proyecto = async (id, proyecto_nuevo) => {
    try {
        return await prisma.proyectos.update({
            where: {
                id: id
            }, data: proyecto_nuevo
        })
    } catch (e) {
        return null
    }
}

const delete_proyecto = async (id) => {
    try {
        return await prisma.proyectos.delete({
            where: {
                id: id
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