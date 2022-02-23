// external imports
const createError = require("http-errors");

// internal imports
const Attendance = require('../../../models/Attendance');

// giving attendance
async function addAttendance(req, res, next) {
    try {
        // creating attendance obj
        const timestamp = new Date(req.body.timestamp);

        // setting the attendance status
        let status;
        if (timestamp.getHours() <= 10 && timestamp.getMinutes() <= 15)
            status = "present";
        else status = "late";

        // check if entry on that day already exists or not
        const date = timestamp.toISOString().split("T")[0];
        const isValidDate = await Attendance.findOne({
            userId: req.userId,
            timeDate: {
                $gte: new Date(`${date}T00:00:00.000Z`),
                $lt: new Date(`${date}T12:00:00.000Z`)
            }
        });

        if (isValidDate) {
            throw createError("Attendance already given on today");
        }


        // creating object to upload
        const attendance = new Attendance({
            userId: req.userId,
            timeDate: timestamp,
            status,
        });
        await attendance.save();


        res.status(200).json({
            attendance,
            message: 'Attendance added successfully',
        })
    } catch (error) {
        next(error);
    }
}

// retrieving attendance data
async function getAttendance(req, res, next) {
    try {
        // converting string to date
        const fromDate = new Date(req.query.from);
        const toDate = new Date(req.query.to + "T12:00:00.000Z");

        // now retrieving data from database
        const attendances = await Attendance.find({
            userId: req.userId,
            timeDate: {
                $gte: fromDate,
                $lte: toDate
            }
        }).select({
            _id: 0,
            __v: 0,
        }).populate("userId", "name");
        res.status(200).json({
            attendances
        });
    } catch (error) {
        next(createError(error));
    }
}

module.exports = {
    addAttendance,
    getAttendance
}