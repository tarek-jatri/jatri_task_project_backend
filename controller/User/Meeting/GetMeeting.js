// external imports
const createError = require("http-errors");

// internal imports
const Meeting = require("../../../models/Meeting");
const formatTimestamp = require("../../../common/date-time/formatTimestamp");

// adding meeting request
async function getMeetingDetails(req, res, next) {
    try {
        /**
         *  checking if date is given as query or not
         *  if not then setting current day as date parameter
         */
        let date = req.query.date;
        if (!date) {
            date = new Date(new Date().toISOString().split("T")[0]);
        } else {
            date = new Date(date);
        }

        // getting meetings
        let meetings;
        // checking if it's requested by user/admin
        if (req.userRole === "user") {
            meetings = await Meeting
                .find({
                    userId: req.userId,
                    fromTime: {
                        $gte: date
                    }
                })
                .sort({fromTime: "asc"})
                .select({
                    __v: 0,
                })
                .populate("members", "name  email -_id");
        } else {
            meetings = await Meeting
                .find({
                    fromTime: {
                        $gte: date
                    }
                })
                .sort({fromTime: "asc"})
                .select({
                    __v: 0,
                })
                .populate("userId", "name -_id")
                .populate("members", "name -_id");
        }

        // constructing payload
        const payloads = [];
        for (const meeting of meetings) {
            const from = formatTimestamp(meeting.fromTime);
            const to = formatTimestamp(meeting.toTime);
            const payload = {
                meetingId: meeting._id,
                name: meeting.userId.name,
                date: from.date,
                fromTime: from.strTime,
                toTime: to.strTime,
                members: meeting.members,
                comments: meeting.comments,
                status: meeting.status,
            }
            payloads.push(payload);
        }

        res.status(200).json({
            payloads,
        });
    } catch (error) {
        next(createError(error));
    }
}

module.exports = {
    getMeetingDetails
}