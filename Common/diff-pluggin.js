const {detailedDiff} = require("deep-object-diff");
const logger = require("./logger")
let previous, current, data = {};

const plugin = function (schema) {
    schema.pre('findOneAndUpdate', async function (next, req) {
        console.log(">>>>>>>>>>>>>>>>>>>>>> req: ")
        console.log(this);
        // console.dir(this.model.modelName)
        previous = await this.model.findOne(this.getQuery()).select({__v: 0}).lean();
        next()
        // console.log(docToUpdate); // The document that `findOneAndUpdate()` will modify
    });
    schema.post('findOneAndUpdate', doc => {
        // console.log("Entered ", doc)
        current = doc;
        delete current.__v;
        delete previous.__v;

    })

    schema.pre('save', (next, {req, attendance}) => {
        // data = {
        //     method: req.method,
        //     action: "CREATE",
        //     ip: req.ip,
        //     apiUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
        //     requestedBy: req.userId,
        // }
        next();
    })

    schema.post('save', doc => {
        console.log("~~~~~~~~~~~~~~~~~~~~~~")
        console.dir(this.model.modelName)
        current = doc.toObject({transform: false});
        console.log("Current ", current)
    })
}

module.exports = plugin