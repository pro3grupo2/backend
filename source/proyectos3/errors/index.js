const discord = require("../databases/discord")

const good_response = (res, data) => {
    return res.send({data: data})
}

const bad_response = async (res, error_code, error) => {
    await discord.error(error.name, error_code, error.message)
    return res.status(error_code).send({data: {errors: [error.message]}})
}

module.exports = {
    good_response,
    bad_response
}
