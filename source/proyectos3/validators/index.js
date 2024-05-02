const {validationResult, matchedData, param, query} = require("express-validator")

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
    query('page').default(0).toInt(),
    validate
]

const params_id = [
    param('id', 'Type: Int').exists().toInt(),
    validate
]

const params_string = [
    param('param', 'Type: String').exists().isString(),
    validate
]

module.exports = {
    validate,
    pagination,
    params_id,
    params_string
}