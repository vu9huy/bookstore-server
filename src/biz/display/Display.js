const mongoose = require('mongoose');

const displaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    listBook: { type: Array, required: true },
    displayType: {
        type: String,
        enum: ['slide', 'table'],
        default: 'slide',
        required: true
    },
})

module.exports = mongoose.model('Display', displaySchema)

// const test = {
//     "name": "Best Sellers of the Week",
//     "listBook": ["62b03eb08dd30658d4ef86b1", "62b03eb08dd30658d4ef86b2", "62b03eb08dd30658d4ef86b3", "62b03eb08dd30658d4ef86b4", "62b03ebf8dd30658d4ef86b7", "62b03ebf8dd30658d4ef86b8"],
//     "displayType": "table"
// }