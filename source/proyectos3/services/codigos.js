const prisma = require('../databases/mysql')

const codigos_errors = require('../errors/codigos')

/**
 * Fetch all codes
 * @async
 * @function
 * @returns {Promise<object[]>} The fetched codes
 */
const get_codigos = async () => {
    return prisma.codigos.findMany({})
}

/**
 * Create a new code
 * @async
 * @function
 * @param {object} codigo - The code data
 * @returns {Promise<object>} The created code
 * @throws {Error} When there is an error creating the code
 */
const create_codigo = async (codigo) => {
    try {
        return await prisma.codigos.create({
            data: codigo
        })
    } catch (e) {
        throw new Error(`${codigos_errors.WRONG_CREATE}: ${e.message}`)
    }
}

/**
 * Delete a specific code by its ID
 * @async
 * @function
 * @param {string} id - The ID of the code
 * @returns {Promise<object>} The deleted code
 * @throws {Error} When there is an error deleting the code
 */
const delete_codigo = async (id) => {
    try {
        return await prisma.codigos.delete({
            where: {
                id: id
            }
        })
    } catch (e) {
        throw new Error(`${codigos_errors.WRONG_DELETE}: ${e.message}`)
    }
}

module.exports = {
    get_codigos, create_codigo, delete_codigo
}