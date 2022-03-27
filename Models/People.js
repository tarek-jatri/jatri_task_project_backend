// external improts
const mongoose = require("mongoose");

// defining schema
const peopleSchema = mongoose.Schema(
    {
        jatriId: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        department: {
            type: Object,
            required: true,
        },
        lineManager: {
            type: mongoose.Types.ObjectId,
            ref: "People"
        },
        role: {
            type: Object,
            required: true,
        },
        nid: {
            type: String,
        }
    },
    {
        timestamp: true,
    }
);

// creating model
const People = mongoose.model("People", peopleSchema);

module.exports = People;


