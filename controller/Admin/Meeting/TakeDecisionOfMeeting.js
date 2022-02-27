// external imports
const createError = require('http-errors');

// internal imports
const Meeting = require("../../../models/Meeting");

async function decisionMeeting(req, res, next) {
    try {
        const status = req.query.status;

        if (status !== "accepted" && status !== "rejected") {
            throw createError("Invalid status provided");
        }
        const updatedMeeting = await Meeting
            .findOneAndUpdate({
                _id: req.params.id
            }, {status}, {
                new: true,
            })
            .select({__v: 0});

        // sending response
        res.status(200).json({
            updatedMeeting,
            message: "meeting updated successfully",
        });
    } catch (error) {
        next(createError(error));
    }
}

module.exports = decisionMeeting;