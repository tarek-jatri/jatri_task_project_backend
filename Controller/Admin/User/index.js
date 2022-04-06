const {createAllUser} = require('./CreateAllUser');
const {createUser} = require('./CreateUser');
const {readUserInfos} = require('./ReadUserInfos');
const {updateUserInfo} = require("./UpdateUserInfo");
const {deleteUser} = require("./DeleteUser");
const {usersList} = require("./CreateUsersList");

module.exports = {
    createAllUser,
    createUser,
    readUserInfos,
    updateUserInfo,
    deleteUser,
    usersList
};