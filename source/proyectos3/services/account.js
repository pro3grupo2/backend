const bcryptjs = require("bcryptjs")
const prisma = require('../databases/mysql')
const {escribir_cache, limpiar_cache} = require('../databases/redis')
const {hook_updates} = require("../databases/discord")

const update = async (id, usuario) => {
    if (usuario.password) usuario.password = bcryptjs.hashSync(usuario.password)
    try {
        const data = await prisma.usuarios.update({
            where: {id: id}, data: usuario
        })

        await limpiar_cache([`cached:${data.correo}`])
        await escribir_cache([
            {
                key: `cached:${data.correo}`,
                data: data
            }
        ], process.env.REDIS_SIGNIN_EXPIRES_IN)
        await hook_updates.success("Actualizacion de cuenta", new Date().toISOString(), JSON.stringify(data))

        return data
    } catch (e) {
        throw new Error(`Error actualizando la cuenta ${id} : ${e.message}`)
    }
}

module.exports = {
    update
}