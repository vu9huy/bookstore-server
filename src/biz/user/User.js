const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    bookId: { type: String, required: true },
    quantity: { type: Number, required: true },
}, { _id: false })

const orderSchema = new mongoose.Schema({
    bookId: { type: String, required: true },
    quantity: { type: Number, required: true },
}, { _id: false })

const notiSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: String, required: true },
})

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    salt: { type: String, required: true },
    password: { type: String, requireL: true },
    avatarUrl: { type: String, requireL: true },
    status: { type: Number, required: true, default: 1 },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, required: true },
    verifyEmailToken: { type: String },
    noti: { type: [notiSchema] },
    cart: { type: [cartSchema], },
    order: { type: [orderSchema], },
    gender: { type: String },
    birthday: { type: Date || null },
    address: {
        country: { type: String },
        city: { type: String },
        zipCode: { type: String },
        detailAddress: { type: String },
    },
    phone: { type: String, },
    // refreshToken: { type: String,},
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema)