// external imports
const mongoose = require('mongoose');

// internal imports
const User = require("../../../models/People");
const Attendance = require("../../../models/Attendance");
const countWeekdaysWeekends = require("../../../common/date-time/countWeekdaysWeekends");


async function getAttendanceStatOfAll(attendances, from, to) {
    // using object
    let totalEmployee = 0;
    try {
        totalEmployee = await User.estimatedDocumentCount();
    } catch (error) {
        totalEmployee = 0;
    }

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

    // const present = attendanceStat._id.status === "present" ?
    //
    // absent = totalEmployee - present - late;
    // present += late;
    //
    // const presentPercentage = (present * 100 / totalEmployee).toFixed(2) + "%";


    console.log(">>>> ", attendanceStat);


    return {
        totalEmployee,
        present,
        late,
        absent,
        presentPercentage
    }
}


async function getAttendanceStat(attendances, from, to) {
    // getting weekdays and weekends
    const {weekdays, weekends} = countWeekdaysWeekends(from, to);

    // using object
    let present = 0, late = 0, absent = 0;
    for (const attendance of attendances) {
        if (attendance.status === "present") {
            present++;
        } else {
            late++;
        }
    }

    absent = weekdays - present - late;
    present += late;
    const presentPercentage = (present * 100 / weekdays).toFixed(2) + "%";

    const attendanceStat = await Attendance.aggregate([
        {
            $match: {
                $and: [
                    {
                        userId: new mongoose.Types.ObjectId('6215c0364e5fc4fc5d4a5d6b')
                    },
                    {
                        timeDate: {
                            $gte: new Date('2022-02-1T00:00:00.000+00:00'),
                            $lt: new Date('2022-02-28T12:00:00.000+00:00')
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

    ]);
    return {
        weekdays,
        present,
        late,
        absent,
        presentPercentage
    }
}


module.exports = {
    getAttendanceStat,
    getAttendanceStatOfAll,
};