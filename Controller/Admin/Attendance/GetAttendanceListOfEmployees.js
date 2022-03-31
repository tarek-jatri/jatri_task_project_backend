// external imports
const createError = require("http-errors");

// internal imports
const Attendance = require("../../../Models/Attendance");
const {getAttendanceStatOfAll} = require("../../../Common/get-statistics");


async function getAttendanceListOfEmployees(req, res, next) {
    /**
     *  checking if date is given as query or not
     *  if not then setting current day as date parameter
     */
    let from, to;
    if (!req.query.date) {
        from = new Date(new Date().toISOString().split("T")[0]);
        to = new Date(new Date().toISOString().split("T")[0] + "T23:59:00.000Z");
    } else {
        from = new Date(req.query.date);
        to = new Date(req.query.date + "T23:59:00.000Z");
    }

    // fetching the data
    try {
        const todayAttendances = await Attendance.aggregate([
            {
                $match: {
                    timeDate: {
                        $gte: from,
                        $lte: to,
                    }
                }
            },
            {
                $lookup: {
                    from: 'peoples',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $match: {
                    "user.department.name": req.userDepartment,
                    "user.department.team": {
                        $in: req.userRole.roles,
                    }
                }
            },
            {
                $project: {
                    userId: {
                        _id: "$user._id",
                        name: "$user.name"
                    },
                    timeDate: 1,
                    status: 1,
                }
            },
            {
                $unwind: "$userId._id",
            },
            {
                $unwind: "$userId.name",
            },
            {
                $sort: {
                    timeDate: 1,
                }
            }
        ]);

        // checking if any attendance is given today
        if (todayAttendances && todayAttendances.length > 0) {
            // getting the stat of today's attendance list
            const attendanceStat = await getAttendanceStatOfAll(from, to);
            res.status(200).json({
                attendanceStat,
                todayAttendances,
            });
        } else {
            throw createError(400, "No attendance found on today!!!")
        }
    } catch (error) {
        next(createError(error));
    }


}

module.exports = {
    getAttendanceListOfEmployees
}