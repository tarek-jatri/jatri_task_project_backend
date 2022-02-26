// external import
const express = require('express');

// internal imports
const { createUser, readUserInfos, updateUserInfo, deleteUser } = require("../controller/Admin/User/AdminCreateUserController");
const { addUserValidators, userValidationHandler, updateUserValidators, deleteUserValidator } = require("../middlewares/user/userValidator");
const authAdminTokenMiddleware = require("../middlewares/common/authenticateAdminToken");

const router = express.Router();


// creating user
router.post("/user", addUserValidators, userValidationHandler, authAdminTokenMiddleware, createUser);

// reading user
router.get("/user", authAdminTokenMiddleware, readUserInfos);

// upadting user
router.put("/user/:id", updateUserValidators, userValidationHandler, authAdminTokenMiddleware, updateUserInfo);

// upadting user
router.delete("/user/:id", deleteUserValidator, userValidationHandler, authAdminTokenMiddleware, deleteUser);

module.exports = router;
