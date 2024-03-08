const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_asignaturas = async (skip = 0, take = 20) => {
    return prisma.asignaturas.findMany({
        skip: skip, take: take,
    })
}

const get_asignatura = async (id) => {
    return prisma.asignaturas.findUnique({
        where: {
            id: id
        }
    })
}

const create_asignatura = async (asignatura) => {
    try {
        return await prisma.asignaturas.create({
            data: asignatura
        })
    } catch (e) {
        return null
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
        return null
    }
}

const delete_asignatura = async (id) => {
    try {
        return await prisma.asignaturas.delete({
            where: {
                id: id
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_asignaturas, get_asignatura, create_asignatura, update_asignatura, delete_asignatura
}