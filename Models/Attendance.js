// external imports
const mongoose = require('mongoose');

// defining the schema
const attendanceSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "People"
        },
        timeDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["present", "absent", "late"],
        }
    }
);


// creating model
attendanceSchema.plugin(require("../Common/diff-pluggin"));
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;