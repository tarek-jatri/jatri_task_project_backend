// internal imports
const Settings = require("../../../../Models/Settings");

async function getPermittedIPs() {
    const allSettings = await Settings.find();
    let ipSetting = {};
    for (const setting of allSettings) {
        const parsedSettings = JSON.parse(setting.setting);
        if (parsedSettings.name === "IP") {
            ipSetting = parsedSettings;
            break;
        }
    }
    if (ipSetting && ipSetting.ips.length > 0) {
        return ipSetting.ips;
    } else {
        return "No IP found for setting";
    }
}

module.exports = getPermittedIPs;
