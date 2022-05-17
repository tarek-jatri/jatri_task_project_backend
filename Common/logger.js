const {detailedDiff} = require("deep-object-diff");
const Log = require("../models/Log");

async function logger({current, previous, method, action, ip, apiUrl, model, documentId, requestedBy}) {
    try {
        // console.log(current, previous, method, action, ip, apiUrl, model, documentId)
        const before = detailedDiff(current, previous);
        const after = detailedDiff(previous, current);
        console.log(before, after);
        if (Object.keys(after.added).length || Object.keys(after.deleted).length || Object.keys(after.updated).length) {
            const data = new Log({
                method,
                action,
                model,
                documentId,
                requestedBy,
                ip,
                apiUrl,
                diff: {
                    before: Object.keys(previous).length === 0 ? null : before,
                    after: Object.keys(current).length === 0 ? null : after,
                }
            });
            await data.save();
        }
    } catch {

    }
}

module.exports = logger;