const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_asignaturas_materias = async (skip = 0, take = 20) => {
    return prisma.asignaturas_materias.findMany(
        {
            skip: skip,
            take: take,
        }
    );
}

const get_asignaturas_materia = async (idAsignatura, idMateria) => {
    return prisma.asignaturas_materias.findUnique({
        where: {
            id_asignatura_id_materia: {
                id_asignatura: idAsignatura,
                id_materia: idMateria,
            },
        }
    })
}

const create_asignaturas_materia = async (relacion) => {
    try {
        return await prisma.asignaturas_materias.create({
            data: {
                id_asignatura: relacion.id_asignatura,
                id_materia: relacion.id_materia,
            },
        })
    } catch (e) {
        return null
    }
}

const update_asignaturas_materia = async (idAsignatura, idMateria, relacionNueva) => {
    try {
        return await prisma.asignaturas_materias.update({
            where: {
                id_asignatura_id_materia: {
                    id_asignatura: idAsignatura,
                    id_materia: idMateria,
                },
            }, data: {
                id_asignatura: relacionNueva.id_asignatura,
                id_materia: relacionNueva.id_materia,
            }
        })
    } catch (e) {
        return null
    }
}

const delete_asignaturas_materia = async (idAsignatura, idMateria) => {
    try {
        return await prisma.asignaturas_materias.delete({
            where: {
                id_asignatura_id_materia: {
                    id_asignatura: idAsignatura,
                    id_materia: idMateria,
                },
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_asignaturas_materias,
    get_asignaturas_materia,
    create_asignaturas_materia,
    update_asignaturas_materia,
    delete_asignaturas_materia
}