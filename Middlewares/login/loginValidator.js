// external imports
const {check} = require("express-validator");

// validating user inputs
const doLoginValidators = [
    check("username")
        .isLength({
            min: 1
        })
        .withMessage("Mobile number or email is required"),
    check("password")
        .isLength({
            min: 8
        })
        .withMessage("Password must be at least 8 characters"),
];

module.exports = doLoginValidators;