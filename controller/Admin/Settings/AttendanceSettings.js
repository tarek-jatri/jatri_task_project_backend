// external imports
const createError = require("http-errors");

// internal imports
const Settings = require("../../../models/Settings");

async function attendanceSettings(req, res, next) {
    try {
        const settingsObj = {
            name: req.body.name,
            time: req.body.time,
        };

        const strSettings = JSON.stringify(settingsObj);

        const settings = new Settings({
            setting: strSettings,
        });
        
        await settings.save();
        res.status(200).json({
            settingsObj,
            message: "Settings saved successfully"
        });
    } catch (error) {
        next(createError(error));
    }
}


module.exports = attendanceSettings;