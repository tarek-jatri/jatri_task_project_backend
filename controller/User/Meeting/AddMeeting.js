// external imports
const createError = require("http-errors");

// internal imports
const Meeting = require("../../../models/Meeting");

// adding meeting request
async function addMeetingRequest(req, res, next) {
    try {
        // getting the dates
        const fromTime = new Date(req.body.date + "T" + req.body.fromTime);
        const toTime = new Date(req.body.date + "T" + req.body.toTime);

        // creating meeting obj
        const meetingObj = new Meeting({
            userId: req.userId,
            fromTime,
            toTime,
            comments: req.body.comments,
            status: req.body.status,
        });

        await meetingObj.save();

        res.status(200).json({
            meetingObj,
            message: "Meeting created successfully",
        })
    } catch (error) {
        next(createError(error));
    }
}

module.exports = {
    addMeetingRequest
}