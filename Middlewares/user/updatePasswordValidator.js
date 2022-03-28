// external imports
const {check} = require("express-validator");
const createError = require("http-errors");

// internal imports
const User = require("../../Models/People");
const bcrypt = require("bcrypt");

// creating validator for user
const updateUserPasswordValidator = [
    check("newPassword")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        ),
    check("reEnterNewPassword")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        )
];

module.exports = updateUserPasswordValidator;