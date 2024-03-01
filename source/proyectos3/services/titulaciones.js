const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_titulaciones = async (skip = 0, take = 20) => {
    return prisma.titulaciones.findMany(
        {
            skip: skip,
            take: take,
        }
    );
}

const get_titulacion = async (titulacion_id) => {
    return prisma.titulaciones.findUnique({
        where: {
            id: titulacion_id
        }
    })
}

const create_titulacion = async (titulacion) => {
    try {
        return await prisma.titulaciones.create({
            data: titulacion
        })
    } catch (e) {
        return null
    }
}

const update_titulacion = async (titulacion_id, titulacion_nueva) => {
    try {
        return await prisma.titulaciones.update({
            where: {
                id: titulacion_id
            }, data: titulacion_nueva
        })
    } catch (e) {
        return null
    }
}

const delete_titulacion = async (titulacion_id) => {
    try {
        return await prisma.titulaciones.delete({
            where: {
                id: titulacion_id
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_titulaciones,
    get_titulacion,
    create_titulacion,
    update_titulacion,
    delete_titulacion
}