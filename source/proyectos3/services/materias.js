const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_materias = async (skip = 0, take = 20) => {
    return prisma.materias.findMany(
        {
            skip: skip,
            take: take,
        }
    );
}

const get_materia = async (materia_id) => {
    return prisma.materias.findUnique({
        where: {
            id: materia_id
        }
    })
}

const create_materia = async (materia) => {
    try {
        return await prisma.materias.create({
            data: {
                "titulo": materia.titulo
            }
        })
    } catch (e) {
        return null
    }
}

const update_materia = async (materia_id, materia_nueva) => {
    try {
        return await prisma.materias.update({
            where: {
                id: materia_id
            }, data: {
                "titulo": materia_nueva.titulo
            }
        })
    } catch (e) {
        return null
    }
}

const delete_materia = async (materia_id) => {
    try {
        return await prisma.materias.delete({
            where: {
                id: materia_id
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_materias,
    get_materia,
    create_materia,
    update_materia,
    delete_materia
}