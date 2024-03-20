const prisma = require('../databases/mysql')

const codigos_errors = require('../errors/codigos')

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
        throw new Error(`${codigos_errors.WRONG_CREATE}: ${e.message}`)
    }
}

module.exports = {
    get_codigos, create_codigo
}
