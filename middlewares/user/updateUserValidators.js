// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// internal imports
const User = require("../../models/People");


// updating validator for user
const updateUserValidators = [
    check("id")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ _id: value });
                if (!user) {
                    throw createError("Invalid User Object Id inserted");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check("jatriId")
        .isLength({ min: 6 })
        .withMessage("Jatri ID is required")
        .trim()
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ jatriId: value });
                if (user && user._id != req.params.id) {
                    throw createError("Jatri ID already in use");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: " -." })
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: value });
                if (user && user._id != req.params.id) {
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
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ mobile: value });
                if (user && user._id != req.params.id) {
                    throw createError("Mobile already in use");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
    check("designation")
        .isLength({ min: 1 })
        .withMessage("Designation cannot be empty")
        .trim(),
    check("lineManager")
        .isLength({ min: 1 })
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

module.exports = updateUserValidators;