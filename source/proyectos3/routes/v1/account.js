const express = require("express")

const account_controllers = require("../../controllers/account")
const account_validators = require("../../validators/account")

const auth_middleware = require("../../middleware/auth")

const router = express.Router()

router.put("/", auth_middleware.verificar_JWT, account_validators.update_account, account_controllers.update)

module.exports = router
