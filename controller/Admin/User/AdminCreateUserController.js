const { createUser } = require('./CreateUser');
const { readUserInfos } = require('./ReadUserInfos');
const { updateUserInfo } = require("./UpdateUserInfo");

module.exports = {
    createUser,
    readUserInfos,
    updateUserInfo
};