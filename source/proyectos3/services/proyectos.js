const prisma = require('../databases/mysql')
const {hook_updates} = require("../databases/discord")
const {leer_cache, escribir_cache, limpiar_cache, limpiar_cache_pattern} = require("../databases/redis")

const proyectos_errors = require('../errors/proyectos')

const get_proyectos = async (page, filters) => {
    let
        where_filters = {estado: 'aceptado'},
        has_filters = false,
        filters_keys = ['premiado', 'anio', 'titulaciones', 'busqueda']

    filters_keys.forEach(key => {
        if (!key in filters || filters[key] === undefined) return

        if (key === 'titulaciones')
            where_filters.proyectos_asignaturas = {some: {asignaturas: {titulaciones_asignaturas: {some: {titulaciones: {id: {in: filters.titulaciones}}}}}}}

        else if (key === 'busqueda')
            where_filters.OR = [
                {titulo: {contains: filters.busqueda}},
                {usuarios: {OR: [{correo: {contains: filters.busqueda}}, {nombre_completo: {contains: filters.busqueda}}]}},
                {participantes: {some: {correo: {contains: filters.busqueda}}}}
            ]

        else
            where_filters[key] = filters[key]

        has_filters = true
    })

    if (has_filters) await limpiar_cache([`cached:proyectos:page:${page}`])

    let data = await leer_cache(`cached:proyectos:page:${page}`)
    if (data) return data

    const pagination_size = parseInt(process.env.PAGINATION_SIZE)
    data = await prisma.proyectos.findMany({
        skip: pagination_size * page, take: pagination_size,
        where: {
            AND: where_filters
        },
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

    if (!has_filters) await escribir_cache([{
        key: `cached:proyectos:page:${page}`, data: data
    }], process.env.REDIS_PROYECTOS_EXPIRES_IN)
    await hook_updates.success("Proyectos cacheados", new Date().toISOString(), JSON.stringify(data).substring(0, 1024))

    return data
}

const get_proyecto = async (id) => {
    let data = await leer_cache(`cached:proyectos:${id}`)
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
        key: `cached:proyectos:${id}`, data: data
    }], process.env.REDIS_PROYECTOS_EXPIRES_IN)
    await hook_updates.success("Proyecto cacheado", new Date().toISOString(), JSON.stringify(data).substring(0, 1024))

    return data
}

const create_proyecto = async (proyecto) => {
    try {
        await limpiar_cache_pattern('cached:proyectos:page:*')

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

const delete_proyecto = async (id) => {
    try {
        await limpiar_cache_pattern('cached:proyectos:page:*')
        await limpiar_cache([`cached:proyectos:${id}`])

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

const aceptar_proyecto = async (id) => {
    try {
        await limpiar_cache_pattern('cached:proyectos:page:*')
        await limpiar_cache([`cached:proyectos:${id}`])

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

const rechazar_proyecto = async (id) => {
    try {
        await limpiar_cache_pattern('cached:proyectos:page:*')
        await limpiar_cache([`cached:proyectos:${id}`])

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
    get_proyectos, get_proyecto, create_proyecto, delete_proyecto, aceptar_proyecto, rechazar_proyecto
}
