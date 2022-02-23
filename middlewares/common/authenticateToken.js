// external imports
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

//=> Login Check Middleware
const authTokenMiddleware = async (req, res, next) => {
    const {authorization} = req.headers;
    try {
        const token = authorization.split(" ")[1];
        const decodePayload = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodePayload._id;
        next();
    } catch {
        next(createError("Authentication failed!!!"));
    }
}


// Exporting
module.exports = authTokenMiddleware;
