const transporter = require("../../common/email");
const formatTimestamp = require("../../common/formatTimestamp");


async function sendAttendanceMail(req, res, next) {
    const {
        date,
        strTime
    } = formatTimestamp(req.attendance.timeDate);


    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const msgDate = req.attendance.timeDate.toLocaleDateString("en-US", options);

    const statusStr = req.attendance.status === "late" ? `<strong style="color: red;">${req.attendance.status.toUpperCase()}</strong>` :
        `<strong style="color: green;">${req.attendance.status.toUpperCase()}</strong>`

    const message = `<strong>Jatri ID:</strong> ${req.jatriId}<br><strong>Name:</strong> ${req.username}<br><strong>Date:</strong> ${msgDate}<br><strong>Time:</strong> ${strTime}<br><strong>Status:</strong> ${statusStr}`;
    const result = await transporter.sendMail({
        to: req.userEmail,
        subject: `Jatri Attendance on ${date}`,
        html: `${message}`,
    });
    console.log(`Mail sent to ${req.userEmail}`);
}

module.exports = sendAttendanceMail;