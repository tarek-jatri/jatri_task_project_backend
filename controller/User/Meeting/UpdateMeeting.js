// external imports
const createError = require("http-errors");

// internal imports
const Meeting = require("../../../models/Meeting");

// adding meeting request
async function updateMeetingDetails(req, res, next) {
    try {
        // getting the dates and comments
        const fromTime = new Date(req.body.fromTime);
        const toTime = new Date(req.body.toTime);
        const comments = req.body.comments;

        // creating meeting obj
        const meetingObj = {
            fromTime,
            toTime,
            comments,
        };

        // updating meeting info
        const updatedMeeting = await Meeting
            .findOneAndUpdate({
                _id: req.params.id,
                status: "pending"
            }, meetingObj, {
                new: true,
            })
            .select({__v: 0});

        // checking for already accepted or rejected meeting
        if (updatedMeeting) {
            // sending response
            res.status(200).json({
                updatedMeeting,
                message: "meeting updated successfully",
            });
        } else {
            throw createError("Meeting has already been accepted or rejected");
        }

    } catch (error) {
        next(createError(error));
    }
}

module.exports = {
    updateMeetingDetails
}