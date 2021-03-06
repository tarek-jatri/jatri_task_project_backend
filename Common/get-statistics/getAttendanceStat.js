const Attendance = require("../../Models/Attendance");
const mongoose = require("mongoose");
const countWeekdaysWeekends = require("../date-time/countWeekdaysWeekends");


async function getAttendanceStat(userId, fromDate, toDate) {

    // converting string to date object
    const from = new Date(fromDate);
    const to = new Date(toDate);
    // fetching the present and absent state for the user
    const attendanceStat = await Attendance.aggregate([
        {
            $match: {
                $and: [
                    {
                        userId: new mongoose.Types.ObjectId(userId),
                    },
                    {
                        timeDate: {
                            $gte: from,
                            $lt: to,
                        }
                    }
                ]
            }
        },
        {
            $group: {
                _id: {status: "$status"},
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                status: "$_id.status",
                count: "$count"
            }
        }
    ]);
    
    // assigning the present and late count
    let status = {};

    for (const attendance of attendanceStat) {
        status[attendance.status] = attendance.count;
    }

    let present = status["present"] ? status["present"] : 0;
    const late = status["late"] ? status["late"] : 0;

    // const from = fromTime, to = toTime;
    // getting weekdays and weekends
    const {weekdays, weekends} = countWeekdaysWeekends(from, to);
    const absent = weekdays - present - late;
    present += late;
    const presentPercentage = (present * 100 / weekdays).toFixed(2) + "%";

    return {
        weekdays,
        present,
        late,
        absent,
        presentPercentage
    }
}

module.exports = getAttendanceStat;