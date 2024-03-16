// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const prisma = require('../databases/mysql')
const proyectos_errors = require('../errors/proyectos')

const get_proyectos = async (skip = 0, take = 20) => {
    return prisma.proyectos.findMany({
        skip: skip, take: take, where: {
            validado: true
        }, include: {
            usuarios_proyectos: {
                select: {
                    usuarios: {
                        select: {
                            id: true, correo: true, nombre_completo: true, alias: true, rol: true
                        }
                    }
                }
            }, usuarios: {
                select: {
                    id: true, correo: true, nombre_completo: true, alias: true, rol: true
                }
            }, premios: {
                select: {
                    id: true, titulo: true, anio: true
                }
            }
        }
    })
}

const get_proyecto = async (id) => {
    return prisma.proyectos.findUnique({
        where: {
            id: id
        }, include: {
            usuarios_proyectos: {
                select: {
                    usuarios: {
                        select: {
                            id: true, correo: true, nombre_completo: true, alias: true, rol: true
                        }
                    }
                }
            }, usuarios: {
                select: {
                    id: true, correo: true, nombre_completo: true, alias: true, rol: true
                }
            }, premios: {
                select: {
                    id: true, titulo: true, anio: true
                }
            }
        }
    })
}

const create_proyecto = async (proyecto) => {
    try {
        const {participantes, ...resto} = proyecto
        const data = await prisma.proyectos.create({
            data: resto
        })

        if (participantes) for (const participante of participantes) await prisma.usuarios_proyectos.create({
            data: {id_usuario: participante, id_proyecto: data.id}
        })

        return await get_proyecto(data.id)
    } catch (e) {
        throw new Error(`${proyectos_errors.WRONG_CREATE}: ${e.message}`)
    }
}

const update_proyecto = async (id, proyecto_nuevo) => {
    try {
        const {participantes, ...resto} = proyecto_nuevo
        const data = await prisma.proyectos.update({
            where: {
                id: id
            }, data: resto
        })

        await prisma.usuarios_proyectos.deleteMany({
            where: {
                id_proyecto: id
            }
        })

        if (participantes) for (const participante of participantes) await prisma.usuarios_proyectos.create({
            data: {id_usuario: participante, id_proyecto: data.id}
        })

        return await get_proyecto(id)
    } catch (e) {
        throw new Error(`${proyectos_errors.WRONG_UPDATE}: ${e.message}`)
    }
}

const delete_proyecto = async (id) => {
    try {
        await prisma.usuarios_proyectos.deleteMany({
            where: {
                id_proyecto: id
            }
        })

        return await prisma.proyectos.delete({
            where: {
                id: id
            }
        })
    } catch (e) {
        throw new Error(`${proyectos_errors.WRONG_DELETE}: ${e.message}`)
    }
}

const validar_proyecto = async (id) => {
    try {
        return prisma.proyectos.update({
            where: {
                id: id
            }, data: {
                validado: true
            }
        })
    } catch (e) {
        throw new Error(`${proyectos_errors.WRONG_VALIDATION}: ${e.message}`)
    }
}

module.exports = {
    get_proyectos, get_proyecto, create_proyecto, update_proyecto, delete_proyecto, validar_proyecto
}
