const {validationResult, body} = require("express-validator")

const validate = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        return res.status(403).send({data: err})
    }
}

const pagination = [
    body('skip').toInt().default(0),
    body('take').toInt().default(20),
    validate
]

module.exports = {
    validate,
    pagination
}