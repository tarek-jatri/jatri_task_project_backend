// external imports
const mongoose = require('mongoose');

// defining the schema
const attendanceSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "People"
        },
        time: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["present", "absent", "late"],
        }
    }
);


// creating model
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;