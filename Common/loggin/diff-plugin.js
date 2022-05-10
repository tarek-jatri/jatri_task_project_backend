const _ = require('lodash')
const LogSchema = require('../../Models/LogSchema')
const getDiff = require('./diff')

const plugin = function (schema) {
    schema.post('init', doc => {
        console.log("schema init")
        doc._original = doc.toObject({transform: false})
        // console.log(doc._original)
    })
    schema.pre('findOneAndUpdate', function (next) {
        console.log("schema save")
        if (this.isNew) {
            console.log("this.isNew")
            next()
        } else {
            console.log("this._diff")
            this._diff = getDiff(this, this._update)
            // console.log(">>>>>>>>>>>>>>>>>>", this._diff)
            next()
        }
    })

    schema.methods.log = function (data) {
        console.log("schema log")
        console.log(this._diff)
        data.diff = {
            before: this._original,
            after: this._diff,
        }
        return LogSchema.create(data)
    }
}

module.exports = plugin;