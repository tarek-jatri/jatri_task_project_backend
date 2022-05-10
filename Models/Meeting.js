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
            type: Date,
            required: true,
        },
        toTime: {
            type: Date,
            required: true,
        },
        members: {
            type: [mongoose.Types.ObjectId],
            ref: "People"
        },
        room: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["accepted", "rejected", "pending"],
            default: "pending"
        }
    }
);


// creating model
// meetingSchema.plugin(require("../Common/loggin/diff-plugin"));
const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;