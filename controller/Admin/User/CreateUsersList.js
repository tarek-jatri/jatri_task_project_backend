// external imports
const createError = require("http-errors");
// internal imports
const User = require("../../../models/People");


async function usersList(req, res, next) {
    try {
        const users = await User
            .find()
            .select({
                email: 0,
                mobile: 0,
                designation: 0,
                lineManager: 0,
                role: 0,
                nid: 0,
                __v: 0,
                password: 0,
            })
        if (users && users.length > 0) {
            res.status(200).json({
                users,
            })
        } else {
            res.status(200).json({
                message: "No user found",
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    usersList
}