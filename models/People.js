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
        lineManager: {
            type: mongoose.Types.ObjectId,
            ref: "People"
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
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


// // User JSON
//
// {
//     "jatriId" : "J-0043",
//     "name" : "Akil Jawad",
//     "email": "jawad.jatri@gmail.com",
//     "mobile" : "+8801515288484",
//     "password" : "@Bir1234",
//     "designation" : "Software Engineer(Backend)",
//     "lineManager": "J-0020",
//     "role" : "admin",
//     "nid": "000 000 0000"
// }




