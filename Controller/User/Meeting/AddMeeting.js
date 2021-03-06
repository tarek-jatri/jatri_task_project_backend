// external imports
const createError = require("http-errors");

// internal imports
const Meeting = require("../../../Models/Meeting");
const sendSlackNotification = require("../../../Common/slack-notifiaction/slack-notification");
const meetingTimeCollisionCheck = require("../../../Middlewares/meeting/meetingTimeCollisionCheck");

// adding meeting request
async function addMeetingRequest(req, res, next) {
    try {
        // getting the dates
        const fromTime = new Date(req.body.date + "T" + req.body.fromTime);
        const toTime = new Date(req.body.date + "T" + req.body.toTime);

        if (!await meetingTimeCollisionCheck(req.body.room, fromTime, toTime)) {
            throw createError("Meeting Time Conflict");
        }

        // creating meeting obj
        const meetingObj = new Meeting({
            userId: req.userId,
            fromTime,
            toTime,
            members: req.body.members,
            room: req.body.room,
            comments: req.body.comments,
        });


        await meetingObj.save();

        res.status(200).json({
            message: "Meeting created successfully",
        });

        // // sending slack notification
        // await sendSlackNotification({
        //     userId: req.userId,
        //     username: req.userEmail.split("@")[0],
        //     date: req.body.date,
        //     fromTime,
        //     toTime,
        //     members: req.body.members ? req.body.members : [],
        //     comments: req.body.comments,
        //     status: req.body.status ? req.body.status : "pending",
        // }, "add");

    } catch (error) {
        next(createError(error));
    }
}

module.exports = {
    addMeetingRequest
}