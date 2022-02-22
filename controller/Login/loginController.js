// external imports
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../../models/People");

// login
async function login(req, res, next) {
    try {
        //    find the user with mobile / email
        const user = await User.findOne({
            $or: [{email: req.body.username}, {mobile: req.body.username}]
        });

        if (user && user._id) {
            // checking valid password
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (isValidPassword) {
                // prepare the user object for token
                const userObj = {
                    _id: user._id,
                    name: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role,
                }

                // generate the token
                const token = jwt.sign(userObj, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });

                // setting the token in cookies
                // res.cookie(process.env.COOKIE_NAM, token, {
                //     maxAge: process.env.JWT_EXPIRY,
                //     httpOnly: true,
                //     signed: true,
                // });

                res.status(200).json({
                    user: userObj,
                    token,
                    message: "Login Successful"
                });
            } else {
                throw createError("Login failed! Please try again..");
            }
        } else {
            throw createError("Login failed! Please try again..");
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    login
}