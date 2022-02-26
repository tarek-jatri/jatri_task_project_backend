const { createUser } = require('./CreateUser');
const { readUserInfos } = require('./ReadUserInfos');
const { updateUserInfo } = require("./UpdateUserInfo");
const { deleteUser } = require("./DeleteUser");

module.exports = {
    createUser,
    readUserInfos,
    updateUserInfo,
    deleteUser,
};