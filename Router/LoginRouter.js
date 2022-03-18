// external imports
const express = require("express");

//=> internal imports
const doLoginValidators = require("../Middlewares/login/loginValidator");
const validationErrorHandler = require("../Middlewares/common/validationErrorHandler");
const {login} = require("../Controller/Login/LoginController");
const router = express.Router();


// setting up the Router
router.post("/", doLoginValidators, validationErrorHandler, login);

module.exports = router;