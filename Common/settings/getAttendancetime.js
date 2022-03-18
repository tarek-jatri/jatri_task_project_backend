// internal imports
const Settings = require("../../Models/Settings");

async function getAttendancetime() {
    const allSettings = await Settings.find();
    let attendanceSettings = {};
    for (const setting of allSettings) {
        const parsedSettings = JSON.parse(setting.setting);
        if (parsedSettings.name === "Attendance") {
            attendanceSettings = parsedSettings;
            break;
        }
    }
    if (attendanceSettings && attendanceSettings.length > 0) {
        return {
            hour: parseInt(attendanceSettings.time.split(":")[0]),
            minutes: parseInt(attendanceSettings.time.split(":")[1]),
        }
    } else {
        return {
            hour: 10,
            minutes: 15,
        }
    }
}

module.exports = getAttendancetime;
