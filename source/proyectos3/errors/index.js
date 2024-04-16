const {hook_errors} = require("../databases/discord")

const good_response = (res, data) => {
    return res.send({data: data})
}

const bad_response = async (res, error_code, error) => {
    await hook_errors.error(error.name, error_code, error.message.substring(0, 1024))
    return res.status(error_code).send({data: {errors: [error.message ?? "Error desconocido"]}})
}

module.exports = {
    good_response,
    bad_response
}
