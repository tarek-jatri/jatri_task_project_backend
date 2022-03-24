const transporter = require("../../Common/email");
const formatTimestamp = require("../../Common/date-time/formatTimestamp");
const dateToDayFormatter = require("../../Common/date-time/dateToDayFormatter");

async function sendAttendanceMail(req, res, next) {
    // timestamp to date, time and day conversion
    const {date, strTime} = formatTimestamp(req.attendance.timeDate);
    const msgDate = dateToDayFormatter(req.attendance.timeDate);

    const statusStr =
        req.attendance.status === "late"
            ? `<strong style="color: red;">${req.attendance.status.toUpperCase()}</strong>`
            : `<strong style="color: green;">${req.attendance.status.toUpperCase()}</strong>`;

    const message = `<img src="cid:jatrilogo" width="100" height="60"><br>
                        <strong>Jatri ID:</strong> ${req.jatriId}<br>
                        <strong>Name:</strong> ${req.username}<br>
                        <strong>Date:</strong> ${msgDate}<br>
                        <strong>Time:</strong> ${strTime}<br>
                        <strong>Status:</strong> ${statusStr}`;

    const result = await transporter.sendMail({
        to: req.userEmail,
        subject: `Jatri Attendance on ${date}`,
        html: `${message}`,
        attachments: [{
            filename: "logo.png",
            path: __dirname + "../../../logo.png",
            cid: "jatrilogo",
        }]
    });
    (`Mail sent to ${req.userEmail}`);
}

module.exports = sendAttendanceMail;
