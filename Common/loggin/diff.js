const _ = require('lodash')

const getDiff = (curr, prev) => {
    function changes(object, base) {
        return _.transform(object, (result, value, key) => {
            if (!_.isEqual(value, base[key])) {
                console.log(key)
                // if (value.constructor.toString().indexOf("Date") > -1) console.log("Date Obj", value, base[key], _.isEqual(value, base[key]))
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
            }
        })
    }

    return changes(curr, prev)
}

// const getDiff = (curr, prev) => {
//     function changes(object, base) {
//         const result = {};
//         for (const key in base._doc) {
//             if (object[key] !== base._doc[key])
//                 result[key] = object[key];
//         }
//         return result;
//     }
//
//     return changes(curr, prev);
// }

module.exports = getDiff;