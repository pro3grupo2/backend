const crypto = require("crypto")

const prisma = require('../databases/mysql')
const {hook_updates} = require("../databases/discord")
const {leer_cache, escribir_cache, limpiar_cache_pattern} = require("../databases/redis")

const proyectos_errors = require('../errors/proyectos')

/**
 * Fetch all projects with optional filters
 * @async
 * @function
 * @param {number} page - The page number for pagination
 * @param {object} filters - The filters to apply
 * @returns {Promise<object[]>} The fetched projects
 */
const get_proyectos = async (page, filters) => {
    let
        hash = crypto.createHash('md5').update(JSON.stringify({page: page, ...filters})).digest('hex'),
        cache_hash = `cached:proyectos:hash:${hash}`,
        where_filters = {estado: filters.estado ?? 'aceptado'}

    if ('busqueda' in filters)
        where_filters.OR = [
            {titulo: {contains: filters.busqueda}},
            {usuarios: {OR: [{correo: {contains: filters.busqueda}}, {nombre_completo: {contains: filters.busqueda}}]}},
            {participantes: {some: {correo: {contains: filters.busqueda}}}}
        ]

    if ('premiado' in filters)
        where_filters.premiado = filters.premiado

    if ('anio' in filters)
        where_filters.anio = filters.anio

    if ('titulaciones' in filters || 'area' in filters)
        where_filters.proyectos_asignaturas = {
            some: {
                asignaturas: {
                    titulaciones_asignaturas: {
                        some: {
                            titulaciones: {
                                AND: {
                                    id: {in: filters.titulaciones},
                                    id_area: filters.area
                                }
                            }
                        }
                    }
                }
            }
        }

    let data = await leer_cache(cache_hash)
    if (data) return data

    const pagination_size = parseInt(process.env.PAGINATION_SIZE)
    data = await prisma.proyectos.findMany({
        skip: pagination_size * page, take: pagination_size,
        where: where_filters,
        include: {
            usuarios: {
                select: {
                    id: true, correo: true, alias: true, nombre_completo: true, descripcion: true, portfolio: true, foto: true, rol: true, promocion: true
                }
            },

            premios: {
                select: {id: true, titulo: true}
            },

            participantes: {
                select: {
                    id: true, correo: true
                }
            },

            proyectos_asignaturas: {
                select: {
                    asignaturas: {
                        select: {
                            id: true, titulo: true, curso: true, titulaciones_asignaturas: {
                                select: {
                                    titulaciones: {
                                        select: {
                                            id: true, titulo: true, areas: {
                                                select: {
                                                    id: true, titulo: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    if (!data.length) return data

    await escribir_cache([{
        key: cache_hash, data: data
    }], process.env.REDIS_PROYECTOS_EXPIRES_IN)
    await hook_updates.success(`Proyectos cacheados ${hash}`, new Date().toISOString(), JSON.stringify(data).substring(0, 1024))

    return data
}

/**
 * Fetch all projects of a specific user
 * @async
 * @function
 * @param {string} user_id - The ID of the user
 * @returns {Promise<object[]>} The fetched projects
 */
const get_me_proyectos = async (user_id) => {
    let
        cache_hash = `cached:proyectos:usuario:${user_id}`,
        data = await leer_cache(cache_hash)

    if (data) return data

    data = await prisma.proyectos.findMany({
        where: {
            id_creador: user_id
        }, include: {
            usuarios: {
                select: {
                    id: true, correo: true, alias: true, nombre_completo: true, descripcion: true, portfolio: true, foto: true, rol: true, promocion: true
                }
            },

            premios: {
                select: {id: true, titulo: true}
            },

            participantes: {
                select: {
                    id: true, correo: true
                }
            },

            proyectos_asignaturas: {
                select: {
                    asignaturas: {
                        select: {
                            id: true, titulo: true, curso: true, titulaciones_asignaturas: {
                                select: {
                                    titulaciones: {
                                        select: {
                                            id: true, titulo: true, areas: {
                                                select: {
                                                    id: true, titulo: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    if (!data.length) return data

    await escribir_cache([{
        key: cache_hash, data: data
    }], process.env.REDIS_PROYECTOS_EXPIRES_IN)
    await hook_updates.success(`Proyectos cacheados ${user_id} (usuario)`, new Date().toISOString(), JSON.stringify(data).substring(0, 1024))

    return data
}

/**
 * Fetch a specific project by its ID
 * @async
 * @function
 * @param {string} id - The ID of the project
 * @returns {Promise<object>} The fetched project
 */
const get_proyecto = async (id) => {
    let
        cache_hash = `cached:proyectos:proyecto:${id}`,
        data = await leer_cache(cache_hash)

    if (data) return data

    data = await prisma.proyectos.findUnique({
        where: {
            id: id
        }, include: {
            usuarios: {
                select: {
                    id: true, correo: true, alias: true, nombre_completo: true, descripcion: true, portfolio: true, foto: true, rol: true, promocion: true
                }
            },

            premios: {
                select: {id: true, titulo: true}
            },

            participantes: {
                select: {
                    id: true, correo: true
                }
            },

            proyectos_asignaturas: {
                select: {
                    asignaturas: {
                        select: {
                            id: true, titulo: true, curso: true, titulaciones_asignaturas: {
                                select: {
                                    titulaciones: {
                                        select: {
                                            id: true, titulo: true, areas: {
                                                select: {
                                                    id: true, titulo: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    if (!data) throw new Error(proyectos_errors.NOT_FOUND)

    await escribir_cache([{
        key: cache_hash, data: data
    }], process.env.REDIS_PROYECTOS_EXPIRES_IN)
    await hook_updates.success(`Proyectos cacheados ${id} (proyecto)`, new Date().toISOString(), JSON.stringify(data).substring(0, 1024))

    return data
}

/**
 * Create a new project
 * @async
 * @function
 * @param {object} proyecto - The project data
 * @returns {Promise<object>} The created project
 */
const create_proyecto = async (proyecto) => {
    try {
        await limpiar_cache_pattern('cached:proyectos:hash:*')
        await limpiar_cache_pattern(`cached:proyectos:usuario:${proyecto.id_creador}`)

        const data = await prisma.proyectos.create({
            data: {
                id_creador: proyecto.id_creador, titulo: proyecto.titulo, ficha: proyecto.ficha, url: proyecto.url, portada: proyecto.portada, premiado: proyecto.premiado, estado: 'pendiente', anio: proyecto.anio,

                participantes: {
                    createMany: {
                        data: proyecto.participantes.map((correo) => ({correo: correo})), skipDuplicates: true
                    }
                },

                proyectos_asignaturas: {
                    createMany: {
                        data: proyecto.asignaturas.map((id) => ({id_asignatura: id})), skipDuplicates: true
                    }
                },

                premios: {
                    createMany: {
                        data: proyecto.premios.map((titulo) => ({titulo: titulo})), skipDuplicates: true
                    }
                }
            }
        })

        return await get_proyecto(data.id)
    } catch (e) {
        throw new Error(`${proyectos_errors.WRONG_CREATE}: ${e.message}`)
    }
}

/**
 * Delete a specific project by its ID
 * @async
 * @function
 * @param {string} id - The ID of the project
 * @returns {Promise<object>} The deleted project
 */
const delete_proyecto = async (id) => {
    try {
        await limpiar_cache_pattern('cached:proyectos:hash:*')
        await limpiar_cache_pattern('cached:proyectos:usuario:*')
        await limpiar_cache_pattern(`cached:proyectos:proyecto:${id}`)

        await prisma.participantes.deleteMany({
            where: {
                id_proyecto: id
            }
        })

        await prisma.proyectos_asignaturas.deleteMany({
            where: {
                id_proyecto: id
            }
        })

        await prisma.premios.deleteMany({
            where: {
                id_proyecto: id
            }
        })

        return await prisma.proyectos.delete({
            where: {
                id: id
            }
        })
    } catch (e) {
        throw new Error(`${proyectos_errors.WRONG_DELETE}: ${e.message}`)
    }
}

/**
 * Accept a specific project by its ID
 * @async
 * @function
 * @param {string} id - The ID of the project
 * @returns {Promise<object>} The accepted project
 */
const aceptar_proyecto = async (id) => {
    try {
        await limpiar_cache_pattern('cached:proyectos:hash:*')
        await limpiar_cache_pattern('cached:proyectos:usuario:*')
        await limpiar_cache_pattern(`cached:proyectos:proyecto:${id}`)

        return await prisma.proyectos.update({
            where: {
                id: id
            }, data: {
                estado: 'aceptado'
            }
        })
    } catch (e) {
        throw new Error(`${proyectos_errors.WRONG_VALIDATION}: ${e.message}`)
    }
}

/**
 * Reject a specific project by its ID
 * @async
 * @function
 * @param {string} id - The ID of the project
 * @returns {Promise<object>} The rejected project
 */
const rechazar_proyecto = async (id) => {
    try {
        await limpiar_cache_pattern('cached:proyectos:hash:*')
        await limpiar_cache_pattern('cached:proyectos:usuario:*')
        await limpiar_cache_pattern(`cached:proyectos:proyecto:${id}`)

        return await prisma.proyectos.update({
            where: {
                id: id
            }, data: {
                estado: 'rechazado'
            }
        })
    } catch (e) {
        throw new Error(`${proyectos_errors.WRONG_VALIDATION}: ${e.message}`)
    }
}

module.exports = {
    get_proyectos, get_me_proyectos, get_proyecto, create_proyecto, delete_proyecto, aceptar_proyecto, rechazar_proyecto
}
