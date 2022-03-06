// external import
const express = require("express");

// internal imports
const {
    createUser,
    readUserInfos,
    updateUserInfo,
    deleteUser,
    usersList,
} = require("../controller/Admin/User/AdminCreateUserController");

const {
    getAttendanceListOfEmployees,
    getAttendanceList,
} = require("../controller/Admin/Attendance/AdminAttendanceController");
const { decisionMeeting } = require("../controller/Admin/Meeting/AdminMeetingController");

const {
    addUserValidators,
    updateUserValidators,
    userIdValidator,
} = require("../middlewares/user/userValidators");

const authAdminTokenMiddleware = require("../middlewares/common/authenticateAdminToken");
const validationErrorHandler = require("../middlewares/common/validationErrorHandler");
const meetingIdValidator = require("../middlewares/meeting/meetingValidators");

const {
    addAttendance,
    getAttendance,
} = require("../controller/User/Attendance/UserAttendanceController");
const authUserTokenMiddleware = require("../middlewares/common/authenticateUserToken");
const {
    addMeetingRequest,
    getMeetingDetails,
    updateMeetingDetails,
} = require("../controller/User/Meeting/UserMeetingController");

const router = express.Router();

//=> Admin - User Routes
// creating user
router.post(
    "/user",
    addUserValidators,
    validationErrorHandler,
    authAdminTokenMiddleware,
    createUser
);

// reading user
router.get("/user", authAdminTokenMiddleware, readUserInfos);

// getting user list
router.get("/user/list", authAdminTokenMiddleware, usersList);

// updating user
router.put(
    "/user/:id",
    updateUserValidators,
    validationErrorHandler,
    authAdminTokenMiddleware,
    updateUserInfo
);

// deleting user
router.delete(
    "/user/:id",
    userIdValidator,
    validationErrorHandler,
    authAdminTokenMiddleware,
    deleteUser
);

//=> Admin - Attendance Routes
// adding attendance
router.post("/attendance", authAdminTokenMiddleware, addAttendance);

// getting attendance
router.get("/attendance", authAdminTokenMiddleware, getAttendance);

// getting today's attendance of all employee also given date
router.get(
    "/attendance/all",
    authAdminTokenMiddleware,
    getAttendanceListOfEmployees
);

// getting current month attendance of given employee
router.get(
    "/attendance/:id",
    userIdValidator,
    validationErrorHandler,
    authAdminTokenMiddleware,
    getAttendanceList
);

//=> Admin - Meeting Routes
// adding meeting
router.post("/meeting", authAdminTokenMiddleware, addMeetingRequest);

// getting meeting
router.get("/meeting", authAdminTokenMiddleware, getMeetingDetails);

// updating meeting
router.put(
    "/meeting/:id",
    meetingIdValidator,
    validationErrorHandler,
    authAdminTokenMiddleware,
    updateMeetingDetails
);

// changing meeting status
router.put(
    "/meeting/status/:id",
    meetingIdValidator,
    validationErrorHandler,
    authAdminTokenMiddleware,
    decisionMeeting
);

module.exports = router;
