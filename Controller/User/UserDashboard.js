// external imports
const createError = require("http-errors");

// internal imports
const {getAttendanceStat, getMeetingStatForUser} = require("../../Common/get-statistics");

async function userDashboard(req, res, next) {

    //=> Get current month as from and to
    // getting current date as to date
    const to = new Date(new Date().toISOString().split("T")[0] + "T23:59:00.000Z");
    // getting starting of this month's as from date
    const from = new Date(to.getFullYear(), to.getMonth(), 2);

    try {
        // getting attendance stat
        const attendanceStat = await getAttendanceStat(req.userId, from, to);

        // getting meeting stat
        const meetingStat = await getMeetingStatForUser(req.userId, from, to);

        // checking if any attendance is available
        if (attendanceStat) {
            res.status(200).json({
                attendanceStat,
                meetingStat
            });
        } else {
            res.status(200).json({
                message: "No attendance found!!!",
            });
        }
    } catch (error) {
        next(createError(error));
    }
}

module.exports = userDashboard;