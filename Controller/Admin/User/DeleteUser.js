// external improts
const createError = require("http-errors");
// internal improts
const User = require("../../../Models/People");


async function deleteUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            user,
            message: "User deleted sucessfully",
        })
    } catch (error) {
        next(createError(error));
    }
}

module.exports = {
    deleteUser,
}