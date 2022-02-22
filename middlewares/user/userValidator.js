// external imports
const {check, validationResult} = require("express-validator");
const createError = require("http-errors");
const {unlink} = require("fs");
const path = require("path");

// internal imports
const User = require("../../models/People");

// creating validator for user
const addUserValidators = [
    check("jatriId")
        .isLength({min: 6})
        .withMessage("Jatri ID is required")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({jatriId: value});
                if (user) {
                    throw createError("Jatri ID already in use");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check("name")
        .isLength({min: 1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: " -."})
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({email: value});
                if (user) {
                    throw createError("Email already in use");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check("mobile")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be valid Bangladeshi mobile number")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({mobile: value});
                if (user) {
                    throw createError("Mobile already in use");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check("password")
        .isStrongPassword()
        .withMessage(
            "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
        ),
    check("designation")
        .isLength({min: 1})
        .withMessage("Designation cannot be empty")
        .trim(),
    check("lineManager")
        .isLength({min: 1})
        .withMessage("Line Manager cannot be empty")
        .trim(),
    check("nid")
        .isNumeric()
        .withMessage("NID cannot have characters")
        .trim()
        .custom(async (value) => {
            if (!(value.length === 10 || value.length === 14)) {
                throw createError("Invalid NID value inserted");
            }
        }),
];

// creating validation errors handler
const addUserValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // responding the errors
        res.status(500).json({
            errors: mappedErrors,
        });
    }
};

module.exports = {
    addUserValidators,
    addUserValidationHandler,
};
