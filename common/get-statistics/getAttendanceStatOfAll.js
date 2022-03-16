// internal imports
const User = require("../../models/People");
const Attendance = require("../../models/Attendance");


async function getAttendanceStatOfAll(from, to) {
    console.log(from, to)
    // using object
    let totalEmployee = 0;
    try {
        totalEmployee = await User.estimatedDocumentCount();
    } catch (error) {
        totalEmployee = 0;
    }

    // counting the present and absent state
    const attendanceStat = await Attendance.aggregate([
        {
            $match: {
                timeDate: {
                    $gte: from,
                    $lt: to
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
    let present = attendanceStat[0].status === "present"
        ? attendanceStat[0].count
        : attendanceStat[1].count;
    const late = attendanceStat[0].status === "late"
        ? attendanceStat[0].count
        : attendanceStat[1].count;

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