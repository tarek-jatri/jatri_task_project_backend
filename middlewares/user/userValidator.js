// internal imports
const addUserValidators = require("./addUserValidators");
const userValidationHandler = require("./userValidationHandler");
const updateUserValidators = require("./updateUserValidators");
const deleteUserValidator = require("./deleteUserValidator");

module.exports = {
    addUserValidators,
    userValidationHandler,
    updateUserValidators,
    deleteUserValidator,
};
