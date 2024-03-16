const prisma = require('../databases/mysql')
const nodemailer = require('nodemailer');

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
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'recuperacion.repositorio.utad@gmail.com',
            pass: 'sfxn ucvq enin goeh',
        },
    });

    let mailOptions = {
        from: 'recuperacion.repositorio.utad@gmail.com',
        to: templateParams.to_email,
        subject: templateParams.subject,
        html: templateParams.message,
    };

    try {
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error al enviar el correo', error);
                    reject(error);
                } else {
                    console.log('Correo enviado: ' + info.response);
                    resolve(info);
                }
            });
        });
        return "Correo enviado";  // Éxito
    } catch (error) {
        throw new Error(`Error al enviar correo : ${templateParams.to_email}`);  // Falló
    }
};

module.exports = {obtenerUsuario, enviarCorreo};