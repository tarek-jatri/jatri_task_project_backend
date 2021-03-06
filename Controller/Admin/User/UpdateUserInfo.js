// external imports
const createError = require("http-errors");
// internal imports
const User = require("../../../Models/People");


async function updateUserInfo(req, res, next) {
    try {
        // destructuring the request body inputs
        const user = {...req.body};
        // // deleting the object id from request body
        // delete user._id;
        // // deleting the password from request body if given
        // delete user.password;

        // updating the user's info
        const updateUser = await User
            .findOneAndUpdate({
                _id: req.params.id,
            }, user, {
                new: true
            })
            .select({password: 0, __v: 0});

        // sending response
        res.status(200).json({
            message: "user updated successfully",
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
    updateUserInfo
}