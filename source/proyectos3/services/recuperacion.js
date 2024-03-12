const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const emailjs = require('@emailjs/browser');

const templateID='template_db5jrrk';
const serviceID='service_2rhc0lp'


const obtenerUsuario = async (correo) => {
    return prisma.usuarios.findUnique({
        where: {
            correo: correo
        }, select: {
            correo: true, nombre_completo: true
        }
    })
}

const enviarCorreo = async (templateParams) => {
    emailjs.send(serviceID, templateID, templateParams).then(
        (response) => {
        console.log('SUCCESS!', response.status, response.text);
        return 1;
        },
        (error) => {
        console.log('FAILED...', error);
        return 2;
        },
    );
}

module.exports = {obtenerUsuario,enviarCorreo};