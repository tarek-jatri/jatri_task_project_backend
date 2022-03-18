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
                _id: "$status",
                count: {$sum: 1}
            }
        }
    ]);

    console.log(meetingStat);

    /**
     * // counting the present and absent state for the user
     *     const attendanceStat = await Attendance.aggregate([
     *         {
     *             $match: {
     *                 $and: [
     *                     {
     *                         userId: new mongoose.Types.ObjectId(userId),
     *                     },
     *                     {
     *                         timeDate: {
     *                             $gte: from,
     *                             $lt: to,
     *                         }
     *                     }
     *                 ]
     *             }
     *         },
     *         {
     *             $group: {
     *                 _id: {status: "$status"},
     *                 count: {$sum: 1}
     *             }
     *         },
     *         {
     *             $project: {
     *                 _id: 0,
     *                 status: "$_id.status",
     *                 count: "$count"
     *             }
     *         }
     *     ]);
     */
}

module.exports = getMeetingStatForUser;