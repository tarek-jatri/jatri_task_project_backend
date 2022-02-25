// external improts
const createError = require("http-errors");
// internal improts
const User = require("../../../models/People");


async function updateUserInfo(req, res, next) {
    try {
        // destructuring the request body inputs
        const user = { ...req.body };
        // deleting the object id from request body
        delete user._id;
        // deleting the password from request body if given
        delete user.password;

        // updating the user's info
        const updateUser = await User
            .findOneAndUpdate({
                _id: req.body._id,
            }, user, {
                new: true
            })
            .select({ password: 0, __v: 0 });

        // sending response
        res.status(200).json({
            updateUser,
            message: "user updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occurred from user controller",
                },
            },
        });
    }
}


module.exports = {
    updateUserInfo
}