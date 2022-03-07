// external imports
const createError = require("http-errors");

// internal imports
const Attendance = require("../../../models/Attendance");
const User = require("../../../models/People");
const {getAttendanceStat} = require("./AttendanceStatistics");

async function getAttendanceList(req, res, next) {
    try {
        let from, to;
        /**
         * checking if date given as query parameter or not
         * if not then set up the dates for last one month
         * converting string to date
         */
        if (req.query.from && req.query.to) {
            from = new Date(req.query.from);
            to = new Date(req.query.to + "T12:00:00.000Z");
        } else {
            to = new Date(new Date().toISOString().split("T")[0] + "T12:00:00.000Z");
            from = new Date(
                new Date(new Date().setDate(to.getDate() - 30))
                    .toISOString()
                    .split("T")[0] + "T00:00:00.000Z"
            );
        }
        // now retrieving data from database
        const attendances = await Attendance.find({
            userId: req.params.id,
            timeDate: {
                $gte: from,
                $lte: to,
            },
        })
            .sort({timeDate: "asc"})
            .select({
                userId: 0,
                _id: 0,
                __v: 0,
            });

        // getting name
        const user = await User
            .findOne({_id: req.params.id})
            .select({
                name: 1,
            });
        
        // checking if any attendance is available
        if (attendances && attendances.length > 0) {
            // getting the stat of attendance list
            const attendanceStat = await getAttendanceStat(attendances, from, to);
            res.status(200).json({
                attendanceStat,
                id: user._id,
                name: user.name,
                attendances,
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

module.exports = {
    getAttendanceList,
};
