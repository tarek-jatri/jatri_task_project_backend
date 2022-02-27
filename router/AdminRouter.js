// external import
const express = require("express");

// internal imports
const {
    createUser,
    readUserInfos,
    updateUserInfo,
    deleteUser,
} = require("../controller/Admin/User/AdminCreateUserController");

const {
    addUserValidators,
    updateUserValidators,
    deleteUserValidator,
} = require("../middlewares/user/userValidators");

const authAdminTokenMiddleware = require("../middlewares/common/authenticateAdminToken");

const validationErrorHandler = require("../middlewares/common/validationErrorHandler");

const {
    getAttendanceListOfEmployees,
    getAttendanceList,
} = require("../controller/Admin/Attendance/AdminAttendanceController");

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
    deleteUserValidator,
    validationErrorHandler,
    authAdminTokenMiddleware,
    deleteUser
);

//=> Admin - Attendance Routes
/**
 * Adding and viewing own attendance is similar as user attendance
 * so using user's API instead
 */

// getting today's attendance of all employee also given date
router.get(
    "/attendance",
    authAdminTokenMiddleware,
    getAttendanceListOfEmployees
);

// getting current month attendance of given employee
router.get(
    "/attendance/:id",
    deleteUserValidator,
    authAdminTokenMiddleware,
    getAttendanceList
);

module.exports = router;
