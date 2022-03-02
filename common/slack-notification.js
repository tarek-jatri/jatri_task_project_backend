const axios = require("axios");
const formatTimestamp = require("./formatTimestamp");

async function sendSlackNotification(meeting) {

    const from = formatTimestamp(meeting.fromTime);
    const to = formatTimestamp(meeting.toTime);

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    meeting.date = new Date(meeting.date).toLocaleDateString("en-US", options);

    await axios.post(process.env.SLACK_NOTIFICATION_URL, {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "You have a new *meeting* request:\n"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*Type:*\nRequest For Meeting Schedule\n*Requested By:*\n${meeting.username}\n*When:*\n${meeting.date}\n*Time:*\n${from.strTime} - ${to.strTime}\n*Comments:*\n"${meeting.comments}"\n*Status:*\n${meeting.status}`,
                },
                "accessory": {
                    "type": "image",
                    "image_url": "https://api.slack.com/img/blocks/bkb_template_images/notifications.png",
                    "alt_text": "calendar thumbnail"
                }
            }
        ]
    });
}

module.exports = sendSlackNotification;