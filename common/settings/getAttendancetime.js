// internal imports
const Settings = require("../../models/Settings");

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

    return {
        hour: parseInt(attendanceSettings.time.split(":")[0]),
        minutes: parseInt(attendanceSettings.time.split(":")[1]),
    }
}

module.exports = getAttendancetime;
