// external import
const express = require('express');

// internal imports
const { createUser } = require("../controller/Admin/User/adminCreateUserController");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/user/userValidator");

const router = express.Router();


router.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello from admin",
    })
})

// creating user
router.post("/user", addUserValidators, addUserValidationHandler, createUser);

module.exports = router;
