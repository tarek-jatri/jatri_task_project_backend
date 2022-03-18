// external imports
const mongoose = require('mongoose');

// defining the schema
const settingsSchema = mongoose.Schema(
    {
        setting: String,
    }
);


// creating model
const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;