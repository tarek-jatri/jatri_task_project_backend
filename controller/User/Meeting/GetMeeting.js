// external imports
const createError = require("http-errors");

// internal imports
const Meeting = require("../../../models/Meeting");

// adding meeting request
async function getMeetingDetails(req, res, next) {
    try {
        /**
         *  checking if date is given as query or not
         *  if not then setting current day as date parameter
         */
        let date = req.query.date;
        if (!date) {
            date = new Date(new Date().toISOString().split("T")[0]);
        } else {
            date = new Date(date);
        }

        // getting meetings
        let meetings;
        // checking if it's requested by user/admin
        if (req.userRole === "user") {
            meetings = await Meeting
                .find({
                    userId: req.userId,
                    fromTime: {
                        $gte: date
                    },
                    status: "pending"
                })
                .sort({fromTime: "asc"})
                .select({
                    _id: 0,
                    __v: 0,
                })
                .populate("userId", "name");
        } else {
            meetings = await Meeting
                .find({
                    fromTime: {
                        $gte: date
                    },
                    status: "pending"
                })
                .sort({fromTime: "asc"})
                .select({
                    _id: 0,
                    __v: 0,
                })
                .populate("userId", "name");
        }


        res.status(200).json({
            meetings,
        });
    } catch (error) {
        next(createError(error));
    }
}

module.exports = {
    getMeetingDetails
}