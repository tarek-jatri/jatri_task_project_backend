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
        })
]

module.exports = updateUserValidators;