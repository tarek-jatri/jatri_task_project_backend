// giving attendance
const Attendance = require("../../../Models/Attendance");
const createError = require("http-errors");
const {getAttendanceTime} = require("../../Admin/Settings");

async function addAttendance(req, res, next) {
    try {
        // creating attendance obj
        const timestamp = new Date(req.body.timestamp);

        // setting the attendance status
        let status;
        const {hour, minutes} = await getAttendanceTime();
        if (timestamp.getHours() < hour || timestamp.getHours() === hour && timestamp.getMinutes() <= minutes)
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
            throw createError(400, "Attendance already given on today");
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


        console.log("Plugin called");
        if (attendance && typeof attendance.log === 'function') {
            const data = {
                action: 'update-user',
                category: 'users',
                createdBy: req.user.id,
                message: 'Updated user name',
            }
            attendance.log(data);
        }
        next();
    } catch (error) {
        next(error);
    }

}

module.exports = {
    addAttendance
}