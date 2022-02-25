// external import
const express = require('express');

// internal imports
const { createUser, readUserInfos, updateUserInfo } = require("../controller/Admin/User/AdminCreateUserController");
const { addUserValidators, userValidationHandler, updateUserValidators } = require("../middlewares/user/userValidator");
const authAdminTokenMiddleware = require("../middlewares/common/authenticateAdminToken");

const router = express.Router();


// creating user
router.post("/user", addUserValidators, userValidationHandler, authAdminTokenMiddleware, createUser);

// reading user
router.get("/user", authAdminTokenMiddleware, readUserInfos);

// upadting user
router.put("/user/update", updateUserValidators, userValidationHandler, authAdminTokenMiddleware, updateUserInfo);

module.exports = router;
