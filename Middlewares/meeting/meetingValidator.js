// external imports
const {check} = require("express-validator");
const createError = require("http-errors");

// internal imports
const Meeting = require("../../Models/Meeting");
const meetingTimeCollisionCheck = require("./meetingTimeCollisionCheck");

const meetingValidator = [
    check("id")
        .custom(async (value) => {
            try {
                const meeting = await Meeting.findOne({_id: value});
                if (!meeting) {
                    throw createError("Invalid Meeting Object Id inserted");
                }
            } catch (error) {
                throw error;
            }
        })
];

module.exports = meetingValidator;