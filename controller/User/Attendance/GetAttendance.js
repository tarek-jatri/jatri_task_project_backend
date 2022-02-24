// retrieving attendance data
const Attendance = require("../../../models/Attendance");
const createError = require("http-errors");

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
            .select({
                _id: 0,
                __v: 0,
            })
            .populate("userId", "name");

        res.status(200).json({
            attendances
        });
    } catch (error) {
        next(createError(error));
    }
}

module.exports = {
    getAttendance
}