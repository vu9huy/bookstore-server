const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerSchema = Schema({
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true }
},
    {
        timestamps: true
    })


module.exports = mongoose.model('Banner', bannerSchema);

// const a ={
//     "imageUrl":"dkjdskjdskdskjdskj",
//     "name":"banner1",
//     "description":"banner1",
//     "url":"dsjhjdksjkdkjgf"
// }