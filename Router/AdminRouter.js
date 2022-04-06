// external import
const express = require("express");

// internal imports
const {
    createUser,
    readUserInfos,
    updateUserInfo,
    deleteUser,
    usersList,
} = require("../Controller/Admin/User");

const {
    getAttendanceListOfEmployees,
    getAttendanceList,
} = require("../Controller/Admin/Attendance");
const {decisionMeeting} = require("../Controller/Admin/Meeting");

const {
    addUserValidators,
    updateUserValidators,
    userIdValidator,
} = require("../Middlewares/user/userValidators");

const authAdminTokenMiddleware = require("../Middlewares/common/authenticateAdminToken");
const validationErrorHandler = require("../Middlewares/common/validationErrorHandler");
const {meetingValidator} = require("../Middlewares/meeting");

const {
    addAttendance,
    getAttendance,
} = require("../Controller/User/Attendance");
const {
    addMeetingRequest,
    getMeetingDetails,
    updateMeetingDetails,
} = require("../Controller/User/Meeting");
const {
    attendanceSettings,
    addIpSetting
} = require("../Controller/Admin/Settings");
const sendAttendanceMail = require("../Middlewares/common/sendAttendanceMail");
const adminDashboard = require("../Controller/Admin/AdminDashboard");
const validateIp = require("../Middlewares/common/validateIP");
const {createAllUser} = require("../Controller/Admin/User/CreateAllUser");


const router = express.Router();


//=> Admin - User Routes
//=> User Dashboard
router.get(
    "/dashboard",
    authAdminTokenMiddleware,
    adminDashboard);

// creating user
router.post(
    "/user",
    addUserValidators,
    validationErrorHandler,
    authAdminTokenMiddleware,
    createUser
);

// reading user
router.get(
    "/user",
    readUserInfos);

// getting user list
router.get(
    "/user/list",
    authAdminTokenMiddleware,
    usersList);

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
router.post(
    "/attendance",
    authAdminTokenMiddleware,
    validateIp,
    addAttendance,
    sendAttendanceMail
);

// getting attendance
router.get(
    "/attendance",
    authAdminTokenMiddleware,
    getAttendance
);


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
router.post(
    "/meeting",
    authAdminTokenMiddleware,
    addMeetingRequest
);

// getting meeting
router.get(
    "/meeting",
    authAdminTokenMiddleware,
    getMeetingDetails
);

// updating meeting
router.put(
    "/meeting/:id",
    meetingValidator,
    validationErrorHandler,
    authAdminTokenMiddleware,
    updateMeetingDetails
);

// changing meeting status
router.put(
    "/meeting/status/:id",
    meetingValidator,
    validationErrorHandler,
    authAdminTokenMiddleware,
    decisionMeeting
);


//=> Admin - Setting
// setting attendance time
router.post(
    "/setting/attendanceTime",
    authAdminTokenMiddleware,
    attendanceSettings);
// setting IP Permission
router.post(
    "/setting/ipPermissionSetting",
    authAdminTokenMiddleware,
    addIpSetting);


// create all user
router.post("/createAllUser", createAllUser)

module.exports = router;
