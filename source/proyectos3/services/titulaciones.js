const prisma = require('../databases/mysql')

const titulaciones_errors = require('../errors/titulaciones')

const get_titulaciones = async () => {
    return prisma.titulaciones.findMany({})
}

const get_titulacion = async (id) => {
    return prisma.titulaciones.findUnique({
        where: {
            id: id
        }
    })
}

const create_titulacion = async (titulacion) => {
    try {
        return await prisma.titulaciones.create({
            data: titulacion
        })
    } catch (e) {
        throw new Error(`${titulaciones_errors.WRONG_CREATE} : ${e.message}`)
    }
}

const update_titulacion = async (id, titulacion_nueva) => {
    try {
        return await prisma.titulaciones.update({
            where: {
                id: id
            }, data: titulacion_nueva
        })
    } catch (e) {
        throw new Error(`${titulaciones_errors.WRONG_UPDATE} : ${e.message}`)
    }
}

module.exports = {
    get_titulaciones, get_titulacion, create_titulacion, update_titulacion
}
