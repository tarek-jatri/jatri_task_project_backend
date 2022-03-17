// internal imports
const User = require("../../models/People");
const Attendance = require("../../models/Attendance");


async function getAttendanceStatOfAll(fromTime, toTime) {
    // using object
    let totalEmployee = 0;
    try {
        totalEmployee = await User.estimatedDocumentCount();
    } catch (error) {
        totalEmployee = 0;
    }

    // fetching the present and absent state
    const attendanceStat = await Attendance.aggregate([
        {
            $match: {
                timeDate: {
                    $gte: fromTime,
                    $lt: toTime
                }
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

    const absent = totalEmployee - present - late;
    present += late;

    const presentPercentage = (present * 100 / totalEmployee).toFixed(2) + "%";


    return {
        totalEmployee,
        present,
        late,
        absent,
        presentPercentage
    }
}


module.exports = getAttendanceStatOfAll;