// external imports
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

//=> Login Check Middleware usign cookie
const authTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.signedCookies[process.env.COOKIE_NAME];
        const decodePayload = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodePayload._id;
        req.userRole = decodePayload.role;
        next();
    } catch {
        next(createError("Authentication failed!!!"));
    }
}


// Exporting
module.exports = authTokenMiddleware;
