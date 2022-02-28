// giving attendance
const Attendance = require("../../../models/Attendance");
const createError = require("http-errors");

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

        req.attendance = attendance;
        next();
    } catch (error) {
        next(error);
    }

}

module.exports = {
    addAttendance
}