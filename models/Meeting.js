// external imports
const mongoose = require('mongoose');

// defining the schema
const meetingSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "People"
        },
        fromTime: {
            type: String,
            required: true,
        },
        toTime: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["accepted", "rejected", "pending"],
            default: "pending"
        }
    }
);


// creating model
const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;