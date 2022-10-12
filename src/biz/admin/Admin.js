const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = Schema({
    adminName: { type: String, required: true, unique: true },
    salt: { type: String, required: true },
    password: { type: String, requireL: true, },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Admin', adminSchema);

