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
        to_name: data.nombre_completo,
        to_link: data.correo,
    };
    
    const resultado = await recuperacion_service.enviarCorreo(templateParams)
    if (resultado==1){
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