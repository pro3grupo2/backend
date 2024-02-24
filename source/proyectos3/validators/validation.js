const {validationResult, body, matchedData} = require("express-validator")

const validate = (req, res, next) => {
    try {
        validationResult(req).throw()
        req.body = matchedData(req)
        return next()
    } catch (err) {
        return res.status(403).send({data: {errors: err.array({onlyFirstError: true})}})
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