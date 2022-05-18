const {detailedDiff} = require("deep-object-diff");
let previous, current = {};

const plugin = function (schema) {
    schema.pre('findOneAndUpdate', async function () {
        // console.dir(this);
        // console.dir(this.model.modelName)
        previous = await this.model.findOne(this.getQuery()).select({__v: 0}).lean();
        // console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify
    });
    schema.post('findOneAndUpdate', doc => {
        console.log(this)
        // console.log("Entered ", doc)
        current = doc;
        delete current.__v;
        delete previous.__v;
        // console.log("current ", current)
        console.log("From findOneAndUpdate current: ", current, "\nprevious ", previous);
        const before = detailedDiff(current, previous);
        const after = detailedDiff(previous, current);
        console.log("before: ", before, "\nafter: ", after,);
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