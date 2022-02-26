// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

// creating validation errors handler
const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // responding the errors
        res.status(500).json({
            errors: mappedErrors,
        });
    }
};

module.exports = userValidationHandler;