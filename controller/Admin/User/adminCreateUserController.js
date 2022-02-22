// external imports
const bcrypt = require("bcrypt");

// internal imports
const User = require('../../../models/People');

async function createUser(req, res, next) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            ...req.body,
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
                    msg: "Unknown error occurred from user controller",
                },
            },
        });
        res.status(500).json({
            error
        });
    }
}

module.exports = {
    createUser
};