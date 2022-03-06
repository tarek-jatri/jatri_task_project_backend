const axios = require("axios");
const formatTimestamp = require("../date-time/formatTimestamp");
const dateToDayFormatter = require("../date-time/dateToDayFormatter");
const getNotificationsBlock = require("./getNotificationBlock");

async function sendSlackNotification(meeting) {
    const blocks = await getNotificationsBlock(meeting);
    await axios.post(process.env.SLACK_NOTIFICATION_URL, blocks);

}

module.exports = sendSlackNotification;
