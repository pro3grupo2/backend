const {validationResult, body, matchedData} = require("express-validator")

const validate = (req, res, next) => {
    try {
        validationResult(req).throw()
        req.matched_data = matchedData(req)
        return next()
    } catch (err) {
        return res.status(400).send({data: {errors: err.array({onlyFirstError: true})}})
    }
}

const pagination = [
    body('skip').default(0).toInt(),
    body('take').default(20).toInt(),
    validate
]

module.exports = {
    validate,
    pagination
}