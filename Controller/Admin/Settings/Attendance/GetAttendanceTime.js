// internal imports
const Settings = require("../../../../Models/Settings");

async function getAttendanceTime() {
    const attendanceSettings = await Settings.find({
        "setting.name": "Attendance"
    });
    if (attendanceSettings && attendanceSettings.length > 0) {
        return {
            hour: parseInt(attendanceSettings[0].setting.time.split(":")[0]),
            minutes: parseInt(attendanceSettings[0].setting.time.split(":")[1]),
        }
    } else {
        return {
            hour: 10,
            minutes: 15,
        }
    }
}

module.exports = getAttendanceTime;
