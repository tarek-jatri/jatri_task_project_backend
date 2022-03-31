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

    const message = `<!DOCTYPE html>
            <html>
              <head>
                <style>
                  table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 80%;
                  }
                  td,th {
                    border: 1px solid #dddddd;
                    text-align: center;
                    padding: 8px;
                  }
                  tr:nth-child(even) {
                    background-color: #dddddd;
                  }
                  p{
                    font-family: arial, sans-serif;
                    font-size: 15px;
                  }
                </style>
              </head>
              <body>
                <img src="cid:jatrilogo" width="100" height="60"><br>
                <h2>Dear Concern,</h2>
                <p>Your attendance details of today: </p>
                <table>
                  <tr>
                    <th>Jatri ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                  <tr>
                    <td>${req.jatriId}</td>
                    <td>${req.username}</td>
                    <td>${msgDate}</td>
                    <td>${strTime}</td>
                    <td>${statusStr}</td>
                  </tr>
                </table>
                <br><h3>Thanks & Regards</h3>
              </body>
            </html>
            `;


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
