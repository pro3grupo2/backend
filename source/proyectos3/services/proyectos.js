const prisma = require('../databases/mysql')
const {hook_updates} = require("../databases/discord")
const {leer_cache, escribir_cache, limpiar_cache} = require("../databases/redis")

const proyectos_errors = require('../errors/proyectos')

const get_proyectos = async (skip = 0, take = 20) => {
    let data = await leer_cache('cached:proyectos')
    if (data) return data

    data = await prisma.proyectos.findMany({
        skip: skip, take: take, where: {
            estado: 'aceptado'
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
        key: 'cached:proyectos', data: data
    }], process.env.REDIS_SIGNIN_EXPIRES_IN)
    await hook_updates.success("Proyectos cacheados", new Date().toISOString(), JSON.stringify(data))

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
    }], process.env.REDIS_SIGNIN_EXPIRES_IN)
    await hook_updates.success("Proyecto cacheado", new Date().toISOString(), JSON.stringify(data))

    return data
}

const create_proyecto = async (proyecto) => {
    try {
        await limpiar_cache(['cached:proyectos'])

        const data = await prisma.proyectos.create({
            data: {
                id_creador: proyecto.id_creador,
                titulo: proyecto.titulo,
                ficha: proyecto.ficha,
                url: proyecto.url,
                portada: proyecto.portada,
                estado: 'pendiente',

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
        await limpiar_cache(['cached:proyectos', `cached:proyectos:${id}`])

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
        await limpiar_cache(['cached:proyectos', `cached:proyectos:${id}`])

        return await prisma.proyectos.update({
            where: {
                id: id
            },
            data: {
                estado: 'aceptado'
            }
        })
    } catch (e) {
        throw new Error(`${proyectos_errors.WRONG_VALIDATION}: ${e.message}`)
    }
}

const rechazar_proyecto = async (id) => {
    try {
        await limpiar_cache(['cached:proyectos', `cached:proyectos:${id}`])

        return await prisma.proyectos.update({
            where: {
                id: id
            },
            data: {
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
