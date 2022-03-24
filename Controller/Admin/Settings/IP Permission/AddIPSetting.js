// external imports
const createError = require("http-errors");

// internal imports
const Settings = require("../../../../Models/Settings");

async function addIpSetting(req, res, next) {
    try {
        // set the setting object
        const ipSetting = {
            name: req.body.name,
            ips: req.body.ips,
        }

        // saving to the database
        const settings = new Settings({
            setting: ipSetting
        })
        await settings.save();

        res.status(200).json({
            ipSetting,
            message: "Settings saved successfully"
        });

    } catch (error) {
        next(createError(error));
    }
}

module.exports = addIpSetting;