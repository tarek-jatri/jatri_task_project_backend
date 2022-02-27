// external imports
const createError = require("http-errors");

// internal imports
const Attendance = require("../../../models/Attendance");
const {getAttendanceStatOfAll} = require("./AttendanceStatistics");


async function getAttendanceListOfEmployees(req, res, next) {
    /**
     *  checking if date is given as query or not
     *  if not then setting current day as date parameter
     */
    let from, to;
    if (!req.query.date) {
        from = new Date(new Date().toISOString().split("T")[0]);
        to = new Date(new Date().toISOString().split("T")[0] + "T12:00:00.000Z");
    } else {
        from = new Date(req.query.date);
        to = new Date(req.query.date + "T12:00:00.000Z");
    }

    // fetching the data
    try {
        const todayAttendances = await Attendance
            .find({
                timeDate: {
                    $gte: from,
                    $lte: to,
                }
            })
            .sort({timeDate: "asc"})
            .select({
                _id: 0,
                __v: 0,
            })
            .populate("userId", "name");

        // checking if any attendance is given today
        if (todayAttendances && todayAttendances.length > 0) {
            // getting the stat of today's attendance list
            const attendanceStat = await getAttendanceStatOfAll(todayAttendances);
            res.status(200).json({
                attendanceStat,
                todayAttendances,
            });
        } else {
            res.status(200).json({
                message: "No attendance on today!!!"
            });
        }
    } catch (error) {
        next(createError(error));
    }


}

module.exports = {
    getAttendanceListOfEmployees
}