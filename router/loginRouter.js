// external imports
const express = require("express");

//=> internal imports
const {doLoginValidators, doLoginValidationHandler} = require("../middlewares/login/loginValidator");
const {login} = require("../controller/Login/loginController");
const router = express.Router();


// setting up the router
router.post("/", doLoginValidators, doLoginValidationHandler, login);

module.exports = router;