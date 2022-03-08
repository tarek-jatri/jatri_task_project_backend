const axios = require("axios");
const formatTimestamp = require("../date-time/formatTimestamp");
const dateToDayFormatter = require("../date-time/dateToDayFormatter");
const getAddNotificationsBlock = require("./getAddNotificationBlock");
const getUpdateNotificationsBlock = require("./getUpdateNotificationBlock");

async function sendSlackNotification(meeting, state) {
    const blocks = state === "add"
        ? await getAddNotificationsBlock(meeting)
        : await getUpdateNotificationsBlock(meeting);
    await axios.post(process.env.SLACK_NOTIFICATION_URL, blocks);
}

module.exports = sendSlackNotification;
