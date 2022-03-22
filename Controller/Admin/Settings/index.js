const attendanceSettings = require("./Attendance/AddAttendanceSettings");
const getAttendanceTime = require("./Attendance/GetAttendanceTime");

const addIpSetting = require("./IP Permission/AddIPSetting")
const getPermittedIPs = require("./IP Permission/GetPremittedIPs")

module.exports = {
    attendanceSettings,
    getAttendanceTime,
    addIpSetting,
    getPermittedIPs,
}