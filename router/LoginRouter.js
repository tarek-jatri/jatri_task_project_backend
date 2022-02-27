// external imports
const express = require("express");

//=> internal imports
const doLoginValidators = require("../middlewares/login/loginValidator");
const validationErrorHandler = require("../middlewares/common/validationErrorHandler");
const {login} = require("../controller/Login/LoginController");
const router = express.Router();


// setting up the router
router.post("/", doLoginValidators, validationErrorHandler, login);

module.exports = router;