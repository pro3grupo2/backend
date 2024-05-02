const prisma = require('../databases/mysql')

const get_users = async (page) => {
    try {
        const pagination_size = parseInt(process.env.PAGINATION_SIZE)
        return await prisma.usuarios.findMany({
            skip: pagination_size * page, take: pagination_size,
            select: {
                id: true,
                correo: true,
                alias: true,
                nombre_completo: true,
                descripcion: true,
                portfolio: true,
                foto: true,
                rol: true,
                promocion: true,
                proyectos: {
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
                }
            }
        })
    } catch (e) {
        throw new Error(e.message)
    }
}

const get_user_by_id = async (id) => {
    try {
        const data = await prisma.usuarios.findUnique({
            where: {
                id: id
            }, select: {
                id: true,
                correo: true,
                alias: true,
                nombre_completo: true,
                descripcion: true,
                portfolio: true,
                foto: true,
                rol: true,
                promocion: true,
                proyectos: {
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
                }
            }
        })

        if (!data)
            throw new Error(`Usuario no encontrado : ${id}`)

        return data
    } catch (e) {
        throw new Error(e.message)
    }
}

const get_user_by_correo = async (correo) => {
    try {
        const data = await prisma.usuarios.findUnique({
            where: {
                correo: correo
            }, select: {
                id: true,
                correo: true,
                alias: true,
                nombre_completo: true,
                descripcion: true,
                portfolio: true,
                foto: true,
                rol: true,
                promocion: true,
                proyectos: {
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
                }
            }
        })

        if (!data)
            throw new Error(`Usuario no encontrado : ${correo}`)

        return data
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    get_users,
    get_user_by_id,
    get_user_by_correo
}