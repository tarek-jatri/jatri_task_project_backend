// external imports
const express = require("express");

//=> internal imports
const {addAttendance, getAttendance} = require("../controller/User/Attendance/userAttendanceController");
const authTokenMiddleware = require("../middlewares/common/authenticateToken");

const router = express.Router();


//=> setting up the router
// adding attendance
router.post("/attendance", authTokenMiddleware, addAttendance);

// getting attendance
router.get("/attendance", authTokenMiddleware, getAttendance);

module.exports = router;