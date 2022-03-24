// external imports
const createError = require("http-errors");

// internal imports
const Settings = require("../../../../Models/Settings");

async function addAttendanceSettings(req, res, next) {
    try {
        const settingsObj = {
            name: req.body.name,
            time: req.body.time,
        };
        // saving to the database
        const settings = new Settings({
            setting: settingsObj,
        });

        await settings.save();
        res.status(200).json({
            settings,
            message: "Settings saved successfully"
        });

    } catch (error) {
        next(createError(error));
    }
}


module.exports = addAttendanceSettings;