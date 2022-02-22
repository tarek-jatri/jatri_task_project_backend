// external import
const express = require('express');

// internal imports
const {createUser} = require("../controller/Admin/User/adminCreateUserController");


const router = express.Router();


router.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello from admin",
    })
})

router.post("/user", createUser);

module.exports = router;
