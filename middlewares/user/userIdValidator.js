// external imports
const {check, validationResult} = require("express-validator");
const createError = require("http-errors");

// internal imports
const User = require("../../models/People");


// updating validator for user
const userIdValidator = [
    check("id")
        .custom(async (value) => {
            try {
                const user = await User.findOne({_id: value});
                if (!user) {
                    throw createError("Invalid User Object Id inserted");
                }
            } catch (error) {
                throw createError("Invalid User Object Id inserted");
            }
        })
]

module.exports = userIdValidator;