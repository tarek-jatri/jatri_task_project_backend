const User = require("../../Models/People");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

async function updateUserPassword(req, res, next) {
    try {
        //    find the user with mobile / email+
        const user = await User
            .findOne({email: req.userEmail})
            .select({
                password: 1,
            });

        if (user && user._id) {
            // checking valid password
            const isValidPassword = await bcrypt.compare(req.body.oldPassword, user.password);
            if (isValidPassword) {
                if (req.body.newPassword !== req.body.oldPassword) {
                    if (req.body.newPassword === req.body.reEnterNewPassword) {
                        const newUserPassword = {
                            password: await bcrypt.hash(req.body.newPassword, 10),
                        }
                        const updateUserPassword = await User
                            .findOneAndUpdate({
                                email: req.userEmail,
                            }, newUserPassword, {
                                new: true
                            })
                            .select({password: 0, __v: 0});

                        // sending response
                        res.status(200).json({
                            message: "User's password updated successfully",
                        });
                    } else
                        throw createError(403, "Password doesn't match");
                } else
                    throw createError(400, "This password is already in use");
            } else
                throw createError(403, "Old Password doesn't match");
        } else {
            throw createError(400, "User Not Found");
        }
    } catch (error) {
        next(createError(error));
    }
}

module.exports = updateUserPassword;