const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    forgetpassword_otp: {
        type: Number
    },
    forgetpassword_otp_dt: {
        type: Date
    }
});

const user = new mongoose.model('User', schema);
module.exports = user;