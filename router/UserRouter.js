// external imports
const express = require("express");

//=> internal imports
const {addAttendance, getAttendance} = require("../controller/User/Attendance/UserAttendanceController");
const {addMeetingRequest, getMeetingDetails} = require("../controller/User/Meeting/UserMeetingController");
const authTokenMiddleware = require("../middlewares/common/authenticateToken");

const router = express.Router();


//=> setting up the router
// adding attendance
router.post("/attendance", authTokenMiddleware, addAttendance);

// getting attendance
router.get("/attendance", authTokenMiddleware, getAttendance);

// adding meeting
router.post("/meeting", authTokenMiddleware, addMeetingRequest);

// getting meeting
router.get("/meeting", authTokenMiddleware, getMeetingDetails);


module.exports = router;