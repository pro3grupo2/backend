const recuperacion_service = require('../services/recuperacion')
const enviarCorreo = async (req, res) => {
    const {MATCHED} = req
    console.log(req.body)
    console.log(req.body.correo)
    const data = await recuperacion_service.obtenerUsuario(req.body.correo)

    if (!data) return res.status(400).send({
        data: {
            errors: ["mail no encontrado"]
        }
    })

    var templateParams = {
        subject: "Recuperacion contraseña repositorio utad",
        to_email: data.correo,
        message: `<p>Hola ${data.nombre_completo},</p>
    <p>&nbsp;</p>
    <p>Nos ha llegado una solicitud de tu cuenta para recuperar la contraseña.</p>
    <p>Para realizar el cambio solicitado, accede a este link: {{to_link}}</p>
    <p>&nbsp;</p>
    <p>Un saludo,</p>
    <p>Equipo Repositorio U-tad.</p>
    <p>&nbsp;</p>
    <p><span style="font-size: 8pt;">Este correo ha sido generado automáticamente, por favor, no responda a este. Cualquier correo enviado respondiendo será desechado.</span></p>`
    };
    
    const resultado = await recuperacion_service.enviarCorreo(templateParams)
    //console.log("resultado: " + resultado)
    if (resultado==1){
        //console.log("ta wapo")
        return res.send({
            data: data.correo
        });
    }

    else{
        return res.status(400).send({
            data: {
                errors: ['errorrrr']
            }
        });
    }
    
}

module.exports = {enviarCorreo};