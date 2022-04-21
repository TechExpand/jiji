const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema & model
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email field is required']
    },
    password: {
        type: String,
        required: [true, 'password field is required']
    },
    phone: {
        type: String,
        required: [true, 'phone field is required']
    },
    fullname: {
        type: String,
        required: [true, 'fullname field is required']
    },
    image: {
        type: String,
        required: [true, 'image field is required']
    },
});


const User = mongoose.model('user',UserSchema);

module.exports = User;