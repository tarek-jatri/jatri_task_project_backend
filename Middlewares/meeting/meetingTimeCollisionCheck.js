// internal imports
const Meeting = require("../../Models/Meeting");

async function meetingTimeCollisionCheck(room, from, to) {
    // getting meeting data for accepted meeting between time period of from and to
    const meeting = await Meeting.find({
        status: "accepted",
        room: room,
        $or: [
            {
                fromTime: {
                    $gte: from,
                    $lte: to,
                }
            },
            {
                toTime: {
                    $gte: from,
                    $lte: to,
                }
            }
        ]
    });

    return !(meeting && meeting.length > 0);
}

module.exports = meetingTimeCollisionCheck;