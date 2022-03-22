//=> External Imports
const mongoose = require("mongoose");

//=> Internal Imports
const Meeting = require("../../Models/Meeting");


async function getMeetingStatForAdmin(fromDate, toDate) {

    // converting string to date object
    const from = new Date(fromDate);
    const to = new Date(toDate);

    // fetching the meeting details
    const meetingStat = await Meeting.aggregate([
        {
            $match: {
                fromTime: {
                    $gte: from,
                    $lt: to,
                }
            }
        },
        {
            $group: {
                _id: {
                    date: {
                        $dateToString: {
                            format: "%Y-%m-%d", date: "$fromTime"
                        }
                    }
                },
                pending: {
                    $sum: {
                        $cond: [
                            {$eq: ["$status", "pending"]}, 1, 0
                        ]
                    }
                },
                accepted: {
                    $sum: {
                        $cond: [
                            {$eq: ["$status", "accepted"]}, 1, 0
                        ]
                    }
                },
                rejected: {
                    $sum: {
                        $cond: [
                            {$eq: ["$status", "rejected"]}, 1, 0
                        ]
                    }
                },
                totalMeetings: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                date: "$_id.date",
                pending: 1,
                accepted: 1,
                rejected: 1,
                totalMeetings: 1,

            }
        },
        {
            $sort: {
                date: 1,
            }
        }
    ]);

    return meetingStat;
}

module.exports = getMeetingStatForAdmin;