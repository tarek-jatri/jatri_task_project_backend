// internal imports
const Settings = require("../../../../Models/Settings");

async function getPermittedIPs() {
    const ipSetting = await Settings.find({
        "setting.name": "IP",
    });
    if (ipSetting && ipSetting[0].setting.ips.length > 0) {
        return ipSetting[0].setting.ips;
    } else {
        return "No IP found for setting";
    }
}

module.exports = getPermittedIPs;
