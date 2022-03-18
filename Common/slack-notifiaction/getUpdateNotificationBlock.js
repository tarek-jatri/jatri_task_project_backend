// external imports
const createError = require("http-errors");

// internal imports
const User = require("../../Models/People");
const formatTimestamp = require("../date-time/formatTimestamp");
const dateToDayFormatter = require("../date-time/dateToDayFormatter");


async function getUpdateNotificationsBlock(meeting) {
    // converting timestamp to date and time
    const from = formatTimestamp(meeting.updatedMeeting.fromTime);
    const to = formatTimestamp(meeting.updatedMeeting.toTime);

    // converting timestamp to day and date
    meeting.date = dateToDayFormatter(meeting.updatedMeeting.fromTime);

    try {
        // getting the line manager mail
        const user = await User
            .find({_id: meeting.updatedMeeting.userId})
            .select({
                email: 1,
                lineManager: 1,
                _id: 0,
            })
            .populate("lineManager", "email -_id");

        let lineManagerMail = "";
        if (user && user.length > 0) {
            lineManagerMail = user[0].lineManager.email.split("@")[0];
            user.username = user[0].email.split("@")[0];
        }
        // getting the members email
        const memberEmails = [];
        for (const member of meeting.updatedMeeting.members) {
            const email = await User.find({_id: member})
                .select({
                    email: 1,
                    _id: 0,
                });
            memberEmails.push(email[0].email);
        }

        // creating the header texts
        const headerText = lineManagerMail !== ""
            ? `MEETING REQUEST UPDATED BY: <@${meeting.adminName}>\n\n<@${lineManagerMail}>, You have a new meeting request:\n`
            : `MEETING REQUEST UPDATED BY: <@${meeting.adminName}>\n\n You have a new meeting request:\n`;

        // creating the body text
        let bodyText = "";
        bodyText += `>*Type:*\n>Request For Meeting Schedule\n`;
        bodyText += `>*Requested By:*\n>_<@${user.username}>_\n`;
        bodyText += `>*When:*\n>${meeting.date}\n`;
        bodyText += `>*Time:*\n>${from.strTime} - ${to.strTime}\n`;
        bodyText += `>*Meeting Members:*\n>`
        if (memberEmails && memberEmails.length > 0) {
            for (const mail of memberEmails)
                bodyText += ` _<@${mail.split("@")[0]}>_`;
        } else {
            bodyText += `>   *No one was selected*`;
        }
        bodyText += `\n>*Comments:*\n>"${meeting.updatedMeeting.comments}"\n>*Status:*\n>\`${meeting.updatedMeeting.status.toUpperCase()}\``;


        const block = {
            blocks: [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": headerText,
                        "emoji": true
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: bodyText,
                    },
                    accessory: {
                        type: "image",
                        image_url:
                            "https://api.slack.com/img/blocks/bkb_template_images/notifications.png",
                        alt_text: "calendar thumbnail",
                    },
                },
            ],
        };

        return block;
    } catch (error) {
        throw createError(error);
    }

}

module.exports = getUpdateNotificationsBlock;