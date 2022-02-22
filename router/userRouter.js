// external imports
const express = require("express");

//=> internal imports
const {addAttendance} = require("../controller/User/Attendance/userAttendanceController");

const router = express.Router();


// setting up the router
router.post("/attendance", addAttendance);

module.exports = router;