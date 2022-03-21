//=> External Imports
const mongoose = require("mongoose");

//=> Internal Imports
const Meeting = require("../../Models/Meeting");


async function getMeetingStatForUser(userId, from, to) {
    console.log(userId, from, to)

    // fetching the meeting details
    const meetingStat = await Meeting.aggregate([
        {
            $match: {
                $and: [
                    {
                        userId: new mongoose.Types.ObjectId(userId),
                    },
                    {
                        fromTime: {
                            $gte: from,
                            $lt: to,
                        }
                    }
                ]
            }
        },
        {
            $group: {
                _id: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d", date: "$fromTime"
                        }
                    },
                    status: "$status"
                },
                count: {$sum: 1},
            }
        }
    ]);

    console.log(meetingStat);
}

module.exports = getMeetingStatForUser;