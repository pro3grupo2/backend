const prisma = require('../databases/mysql')

const asignaturas_errors = require('../errors/asignaturas')

const get_asignaturas = async () => {
    return prisma.asignaturas.findMany({
        include: {
            titulaciones_asignaturas: {
                select: {
                    titulaciones: {
                        select: {
                            id: true, titulo: true, areas: true
                        }
                    }
                }
            }
        }
    })
}

const get_asignatura = async (id) => {
    return prisma.asignaturas.findUnique({
        where: {
            id: id
        }, include: {
            titulaciones_asignaturas: {
                select: {
                    titulaciones: {
                        select: {
                            id: true, titulo: true, areas: true
                        }
                    }
                }
            }
        }
    })
}

const create_asignatura = async (asignatura) => {
    try {
        return await prisma.asignaturas.create({
            data: asignatura
        })
    } catch (e) {
        throw new Error(`${asignaturas_errors.WRONG_CREATE}: ${e.message}`)
    }
}

const update_asignatura = async (id, asignatura) => {
    try {
        return await prisma.asignaturas.update({
            where: {
                id: id
            }, data: asignatura
        })
    } catch (e) {
        throw new Error(`${asignaturas_errors.WRONG_UPDATE}: ${e.message}`)
    }
}

module.exports = {
    get_asignaturas, get_asignatura, create_asignatura, update_asignatura
}
