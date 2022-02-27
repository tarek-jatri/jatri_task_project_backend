// external imports
const express = require("express");

//=> internal imports
const {addAttendance, getAttendance} = require("../controller/User/Attendance/UserAttendanceController");
const {
    addMeetingRequest,
    getMeetingDetails,
    updateMeetingDetails
} = require("../controller/User/Meeting/UserMeetingController");
const authUserTokenMiddleware = require("../middlewares/common/authenticateUserToken");
const meetingIdValidator = require("../middlewares/meeting/meetingValidators");
const validationErrorHandler = require("../middlewares/common/validationErrorHandler");

const router = express.Router();


//=> setting up the router
//=> User Attendance
// adding attendance
router.post("/attendance", authUserTokenMiddleware, addAttendance);

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