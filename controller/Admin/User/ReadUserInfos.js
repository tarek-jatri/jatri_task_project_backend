// external imports
const createError = require("http-errors");
// internal imports
const User = require("../../../models/People");


async function readUserInfos(req, res, next) {
    try {
        let users;
        /**
         * checking if the JatriId is sent with the api or not
         * if JatriId is not send then response with all the users info
         * otherwise only searched id's info
         */
        const jatriId = req.query.jatriId;
        if (!jatriId) {
            users = await User
                .find()
                .select({
                    __v: 0,
                    password: 0,
                })
                .populate("lineManager", "name -_id");
        } else {
            users = await User
                .find({jatriId: jatriId})
                .select({
                    __v: 0,
                    password: 0,
                })
                .populate("lineManager", "name -_id");
        }
        // this is used to remove the super admin
        users.shift();
        
        // checking if user is found or not
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
    readUserInfos
}