// external imports
const express = require("express");

//=> internal imports
const {addAttendance, getAttendance} = require("../Controller/User/Attendance");
const {
    addMeetingRequest,
    getMeetingDetails,
    updateMeetingDetails
} = require("../Controller/User/Meeting");
const userDashboard = require("../Controller/User/UserDashboard");
const authUserTokenMiddleware = require("../Middlewares/common/authenticateUserToken");
const sendAttendanceMail = require("../Middlewares/common/sendAttendanceMail");
const meetingIdValidator = require("../Middlewares/meeting/meetingValidator");
const validationErrorHandler = require("../Middlewares/common/validationErrorHandler");
const validateIp = require("../Middlewares/common/validateIP");

const router = express.Router();


//=> setting up the route

//=> User Dashboard
router.get("/dashboard", authUserTokenMiddleware, userDashboard);

//=> User Attendance
// adding attendance
router.post("/attendance", authUserTokenMiddleware, validateIp, addAttendance, sendAttendanceMail);

// getting attendance
router.get("/attendance", authUserTokenMiddleware, getAttendance);


//=> User Meeting
// adding meeting
router.post("/meeting", authUserTokenMiddleware, addMeetingRequest);

// getting meeting
router.get("/meeting", authUserTokenMiddleware, getMeetingDetails);

// updating meeting
router.put("/meeting/:id", meetingIdValidator, validationErrorHandler, authUserTokenMiddleware, updateMeetingDetails);


module.exports = router;