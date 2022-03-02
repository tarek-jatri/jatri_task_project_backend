const axios = require("axios");

async function sendSlackNotification(meeting) {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    meeting.date = new Date(meeting.date).toLocaleDateString("en-US", options);

    await axios.post("https://hooks.slack.com/services/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", {
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
                    "text": `*Type:*\nRequest For Meeting Schedule\n*Requested By:*\n${meeting.username}\n*When:*\n${meeting.date}\n*Time:*\n${meeting.from} - ${meeting.to}\n*Comments:*\n"${meeting.comments}"\n*Status:*\n${meeting.status}`,
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