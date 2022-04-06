// external imports
const bcrypt = require("bcrypt");

// internal imports
const User = require('../../../Models/People');

async function createAllUser(req, res, next) {
    try {
        const users = req.body.users;
        const userList = [];
        for (const user of users) {
            const data = {
                jatriId: user.jatriId,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                password: await bcrypt.hash(user.password, 10),
                designation: user.designation,
                department: user.department,
                lineManager: user.lineManager,
                role: user.role,
                nid: user.nid,
            }
            userList.push(data);
        }

        console.log(userList);

        // const newUser = new User({
        //     ...req.body,
        //     password: hashedPassword,
        // });
        // await newUser.save();
        //
        // res.status(200).json({
        //     message: "user saved successfully",
        // });
        const savedUser = await User.insertMany(userList);
        res.status(200).json({savedUser});
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occurred from create all user Controller",
                },
            },
        });
    }
}

module.exports = {
    createAllUser
}