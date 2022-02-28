const transporter = require("../../common/email");
const formatTimestamp = require("../../common/formatTimestamp");


async function sendAttendanceMail(req, res, next) {
    const {
        date,
        strTime
    } = formatTimestamp(req.attendance.timeDate);


    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const msgDate = req.attendance.timeDate.toLocaleDateString("en-US", options);

    const message = `Jatri ID: ${req.jatriId}\nName: ${req.username}\nDate: ${msgDate}\nTime: ${strTime}\nStatus: ${req.attendance.status}`;

    const result = await transporter.sendMail({
        to: req.userEmail,
        subject: `Jatri Attendance on ${date}`,
        text: `${message}`,
    });
    console.log(`Mail sent to ${req.userEmail}`);
}

module.exports = sendAttendanceMail;