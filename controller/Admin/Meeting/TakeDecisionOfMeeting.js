// external imports
const createError = require('http-errors');

// internal imports
const Meeting = require("../../../models/Meeting");

async function decisionMeeting(req, res, next) {
    try {
        const status = req.query.status.toLowerCase();

        if (status !== "accepted" && status !== "rejected") {
            throw createError("Invalid status provided");
        }
        const updatedMeeting = await Meeting
            .findOneAndUpdate({
                _id: req.params.id,
                status: "pending"
            }, {status}, {
                new: true,
            })
            .select({__v: 0});

        // checking for already accepted or rejected meeting
        if (updatedMeeting) {
            // sending response
            res.status(200).json({
                message: "meeting updated successfully",
            });
        } else {
            throw createError("Meeting has already been accepted or rejected");
        }
    } catch (error) {
        next(createError(error));
    }
}

module.exports = decisionMeeting;