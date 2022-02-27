// external imports
const {validationResult} = require("express-validator");


// validation error handler
const validationErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(500).json({
            data: {
                username: req.body.username,
            },
            errors: mappedErrors,
        });
    }
}

module.exports = validationErrorHandler;