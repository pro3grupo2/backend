const bcryptjs = require("bcryptjs")

const prisma = require('../databases/mysql')
const {hook_updates} = require("../databases/discord")
const {limpiar_cache} = require('../databases/redis')

const auth_services = require("../services/auth")

const update = async (id, usuario) => {
    try {
        if (usuario.password) usuario.password = bcryptjs.hashSync(usuario.password)
        const data = await prisma.usuarios.update({
            where: {
                id: id
            }, data: usuario
        })

        await limpiar_cache([`cached:${data.correo}`])
        await hook_updates.success(`Usuario actualizado : ${data.correo}`, new Date().toISOString(), JSON.stringify(data))

        return await auth_services.me(data.correo)
    } catch (e) {
        throw new Error(`Error actualizando la cuenta ${id} : ${e.message}`)
    }
}

module.exports = {
    update
}