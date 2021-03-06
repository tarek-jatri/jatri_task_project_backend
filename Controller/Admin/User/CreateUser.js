// external imports
const bcrypt = require("bcrypt");

// internal imports
const User = require('../../../Models/People');

async function createUser(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let role = "";
        if (req.body.role) {
            role = req.body.role.toLowerCase();
        } else {
            role = "user";
        }
        const newUser = new User({
            ...req.body,
            role,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(200).json({
            message: "user saved successfully",
        });
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occurred from user Controller",
                },
            },
        });
    }
}

module.exports = {
    createUser
}