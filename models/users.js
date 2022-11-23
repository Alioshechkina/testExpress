const mongoose = require('mongoose');
// const validator = require('validator')

const userSchema = new mongoose.Schema({
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },

});

const User = mongoose.model('User', userSchema)
module.exports = User;
