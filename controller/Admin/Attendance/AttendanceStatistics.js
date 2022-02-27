// external imports
const createError = require("http-errors");
// internal imports
const Attendance = require("../../../models/Attendance");
const User = require("../../../models/People");

async function getAttendanceStatOfAll(attendances) {
    // using object
    let present = 0, late = 0, absent = 0, totalEmployee = 0;
    for (const attendance of attendances) {
        if (attendance.status === "present") {
            present++;
        } else {
            late++;
        }
    }
    try {
        totalEmployee = await User.estimatedDocumentCount();
    } catch (error) {
        next(error);
    }
    absent = totalEmployee - present - late;

    return {
        totalEmployee,
        present,
        late,
        absent,
    }
}


async function getAttendanceStat(attendances, totalDays) {
    // using object
    let present = 0, late = 0, absent = 0;
    for (const attendance of attendances) {
        if (attendance.status === "present") {
            present++;
        } else {
            late++;
        }
    }

    absent = totalDays - present - late;

    return {
        totalDays,
        present,
        late,
        absent,
    }
}


module.exports = {
    getAttendanceStat,
    getAttendanceStatOfAll,
};