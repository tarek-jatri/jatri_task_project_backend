// external imports
const createError = require("http-errors");

// internal imports
const Attendance = require("../../../Models/Attendance");
const {getAttendanceStat} = require("../../../Common/get-statistics");

// retrieving attendance data
async function getAttendance(req, res, next) {
    try {
        // converting string to date
        const fromDate = new Date(req.query.from);
        const toDate = new Date(req.query.to + "T12:00:00.000Z");

        // now retrieving data from database
        const attendances = await Attendance
            .find({
                userId: req.userId,
                timeDate: {
                    $gte: fromDate,
                    $lte: toDate
                }
            })
            .sort({timeDate: "asc"})
            .select({
                userId: 0,
                _id: 0,
                __v: 0,
            })
            .populate("userId", "name");

        // checking if any attendance is available
        if (attendances && attendances.length > 0) {
            // getting the stat of attendance list
            const attendanceStat = await getAttendanceStat(attendances, fromDate, toDate);
            res.status(200).json({
                attendanceStat,
                attendances,
            });
        } else {
            res.status(200).json({
                message: "No attendance found!!!",
            });
        }

    } catch (error) {
        next(createError(error));
    }
}

module.exports = {
    getAttendance
}