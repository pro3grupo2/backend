// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_premios = async (skip = 0, take = 20) => {
    return prisma.premios.findMany(
        {
            skip: skip,
            take: take
        }
    );
}

const get_premio = async (premio_id) => {
    return prisma.premios.findUnique({
        where: {
            id: premio_id
        }
    })
}

const create_premio = async (premio) => {
    try {
        return await prisma.premios.create({
            data: premio
        })
    } catch (e) {
        return null
    }
}

const update_premio = async (premio_id, premio_nuevo) => {
    try {
        return await prisma.premios.update({
            where: {
                id: premio_id
            }, data: premio_nuevo
        })
    } catch (e) {
        return null
    }
}

const delete_premio = async (premio_id) => {
    try {
        return await prisma.premios.delete({
            where: {
                id: premio_id
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_premios,
    get_premio,
    create_premio,
    update_premio,
    delete_premio
}