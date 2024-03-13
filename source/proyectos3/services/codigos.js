// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const prisma = require('../databases/mysql')

const get_codigos = async (skip = 0, take = 20) => {
    return prisma.codigos.findMany({
        skip: skip, take: take
    })
}

const create_codigo = async (codigo) => {
    try {
        return await prisma.codigos.create({
            data: codigo
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_codigos, create_codigo
}