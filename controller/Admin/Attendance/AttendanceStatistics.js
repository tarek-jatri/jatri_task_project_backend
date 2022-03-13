// internal imports
const User = require("../../../models/People");
const countWeekdaysWeekends = require("../../../common/date-time/countWeekdaysWeekends");


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
        totalEmployee = 0;
    }
    absent = totalEmployee - present - late;
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