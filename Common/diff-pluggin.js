const {detailedDiff} = require("deep-object-diff");
let previous, current = {};

const plugin = function (schema) {
    schema.post('init', doc => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        doc._original = doc.toObject({transform: false});
        previous = doc.toObject({transform: false});

    })

    schema.post('findOneAndUpdate', doc => {
        // console.log("Entered ", doc)
        current = doc;

        console.log("From findOneAndUpdate current: ", current, "\nprevious ", previous);
        const before = detailedDiff(current, {});
        const after = detailedDiff({}, current);
        console.log("before: ", before, "\nafter: ", after);
    })

    schema.post('save', doc => {
        // console.log("Entered ", doc)
        current = doc.toObject({transform: false});

        console.log("From findOneAndUpdate current: ", current, "\nprevious ", previous);
        const before = detailedDiff(current, previous);
        const after = detailedDiff(previous, current);
        console.log("before: ", before, "\nafter: ", after);
    })
}

module.exports = plugin