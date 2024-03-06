const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_asignaturas_titulaciones = async (skip = 0, take = 20) => {
    return prisma.asignaturas_titulaciones.findMany(
        {
            skip: skip,
            take: take,
        }
    );
}

const get_asignaturas_titulacion = async (idAsignatura, idTitulacion) => {
    return prisma.asignaturas_titulaciones.findUnique({
        where: {
            id_asignatura_id_titulacion: {
                id_asignatura: idAsignatura,
                id_titulacion: idTitulacion,
            },
        }
    })
}

const create_asignaturas_titulaciones = async (relacion) => {
    try {
        return await prisma.asignaturas_titulaciones.create({
            data: {
                id_asignatura: relacion.id_asignatura,
                id_titulacion: relacion.id_titulacion,
            },
        })
    } catch (e) {
        return null
    }
}

const update_asignaturas_titulaciones = async (idAsignatura, idTitulacion, relacionNueva) => {
    try {
        return await prisma.asignaturas_titulaciones.update({
            where: {
                id_asignatura_id_titulacion: {
                    id_asignatura: idAsignatura,
                    id_titulacion: idTitulacion,
                },
            }, data: {
                id_asignatura: relacionNueva.id_asignatura,
                id_titulacion: relacionNueva.id_titulacion,
            }
        })
    } catch (e) {
        return null
    }
}

const delete_asignaturas_titulaciones = async (idAsignatura, idTitulacion) => {
    try {
        return await prisma.asignaturas_titulaciones.delete({
            where: {
                id_asignatura_id_titulacion: {
                    id_asignatura: idAsignatura,
                    id_titulacion: idTitulacion,
                },
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_asignaturas_titulaciones,
    get_asignaturas_titulacion,
    create_asignaturas_titulaciones,
    update_asignaturas_titulaciones,
    delete_asignaturas_titulaciones
}