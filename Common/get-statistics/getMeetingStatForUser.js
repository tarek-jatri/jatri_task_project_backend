//=> External Imports
const mongoose = require("mongoose");

//=> Internal Imports
const Meeting = require("../../Models/Meeting");


async function getMeetingStatForUser(userId, fromDate, toDate) {

    // converting string to date object
    const from = new Date(fromDate);
    const to = new Date(toDate);

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
        },
        {
            $project: {
                _id: 0,
                date: "$_id.date",
                status: "$_id.status",
                count: "$count"
            }
        },
        {
            $sort: {
                "date": 1,
                "count": 1,
            }
        }
    ]);

    console.log(meetingStat);
}

module.exports = getMeetingStatForUser;