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
    userValidationHandler,
    updateUserValidators,
    deleteUserValidator,
} = require("../middlewares/user/userValidator");

const authAdminTokenMiddleware = require("../middlewares/common/authenticateAdminToken");

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
    userValidationHandler,
    authAdminTokenMiddleware,
    createUser
);

// reading user
router.get("/user", authAdminTokenMiddleware, readUserInfos);

// upadting user
router.put(
    "/user/:id",
    updateUserValidators,
    userValidationHandler,
    authAdminTokenMiddleware,
    updateUserInfo
);

// deleting user
router.delete(
    "/user/:id",
    deleteUserValidator,
    userValidationHandler,
    authAdminTokenMiddleware,
    deleteUser
);

//=> Admin - Attendance Routes
/**
 * Adding and viewing own attendance is similar as user attendance
 * so usign user's API instead
 */

// getting today's attendance of all employee also given date
router.get(
    "/attendance",
    authAdminTokenMiddleware,
    getAttendanceListOfEmployees
);

// getting current months attendance of given employee
router.get(
    "/attendance/:id",
    deleteUserValidator,
    authAdminTokenMiddleware,
    getAttendanceList
);

module.exports = router;
