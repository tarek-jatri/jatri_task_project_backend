// external imports
const express = require("express");

//=> internal imports
const { addAttendance, getAttendance } = require("../controller/User/Attendance/UserAttendanceController");
const { addMeetingRequest, getMeetingDetails } = require("../controller/User/Meeting/UserMeetingController");
const authUserTokenMiddleware = require("../middlewares/common/authenticateUserToken");

const router = express.Router();


//=> setting up the router
// adding attendance
router.post("/attendance", authUserTokenMiddleware, addAttendance);

// getting attendance
router.get("/attendance", authUserTokenMiddleware, getAttendance);

// adding meeting
router.post("/meeting", authUserTokenMiddleware, addMeetingRequest);

// getting meeting
router.get("/meeting", authUserTokenMiddleware, getMeetingDetails);


module.exports = router;