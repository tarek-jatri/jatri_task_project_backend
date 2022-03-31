// external imports
const createError = require('http-errors');

// internal imports
const Meeting = require("../../../Models/Meeting");
const meetingTimeCollisionCheck = require("../../../Middlewares/meeting/meetingTimeCollisionCheck");

async function decisionMeeting(req, res, next) {
    try {
        const status = req.query.status.toLowerCase();

        if (status !== "accepted" && status !== "rejected") {
            throw createError(400, "Invalid status provided");
        }

        const meetingObj = await Meeting.findOne({_id: req.params.id});
        if (!await meetingTimeCollisionCheck(meetingObj.room, meetingObj.fromTime, meetingObj.toTime)) {
            throw createError(400, "Meeting Time Conflict");
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
            throw createError(400, "Meeting has already been accepted or rejected");
        }
    } catch (error) {
        next(createError(error));
    }
}

module.exports = decisionMeeting;