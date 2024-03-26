const {validationResult, body, matchedData, param} = require("express-validator")

const validate = (req, res, next) => {
    try {
        validationResult(req).throw()
        req.MATCHED = matchedData(req)
        return next()
    } catch (err) {
        return res.status(400).send({data: {errors: err.array({onlyFirstError: true})}})
    }
}

const pagination = [
    body('page').default(0).isInt(),
    validate
]

const params_id = [
    param('id', 'Type: Int').exists().toInt(),
    validate
]

module.exports = {
    validate,
    pagination,
    params_id
}