// external imports
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

//=> Login Check Middleware using cookie
const authAdminTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.signedCookies[process.env.COOKIE_NAME];
        const decodePayload = await jwt.verify(token, process.env.JWT_SECRET);
        if (decodePayload.role.name !== "admin") {
            throw createError(401, "Authentication Failed!!!");
        }
        req.userId = decodePayload._id;
        req.jatriId = decodePayload.jatriId;
        req.username = decodePayload.name;
        req.userRole = decodePayload.role;
        req.userDepartment = decodePayload.department.name;
        req.userEmail = decodePayload.email;
        next();
    } catch {
        next(createError(401, "Authentication failed!!!"));
    }
}


// Exporting
module.exports = authAdminTokenMiddleware;
