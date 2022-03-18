// external imports
const {check} = require("express-validator");
const createError = require("http-errors");

// internal imports
const Meeting = require("../../Models/Meeting");

const meetingIdValidator = [
    check("id")
        .custom(async (value) => {
            try {
                const meeting = await Meeting.findOne({_id: value});
                if (!meeting) {
                    throw createError("Invalid User Object Id inserted");
                }
            } catch (error) {
                throw createError("Invalid User Object Id inserted");
            }
        })
];

module.exports = meetingIdValidator;