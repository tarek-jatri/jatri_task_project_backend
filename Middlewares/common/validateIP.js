// external imports
const createError = require("http-errors");

// internal imports
const {getPermittedIPs} = require("../../Controller/Admin/Settings")
const getReqIpAddresses = require("../../Common/getReqIpAddresses");

async function validateIp(req, res, next) {
    try {
        const userIpAddresses = await getReqIpAddresses();
        const permittedIpAddresses = await getPermittedIPs();
        if (permittedIpAddresses.includes(userIpAddresses[1]))
            next();
        else
            throw createError("Access denied due to unauthorized IP address: " + userIpAddresses[0]);
    } catch (error) {
        next(createError(error))
    }
}

module.exports = validateIp;