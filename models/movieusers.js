const mongoose = require('mongoose');


// Default Schema for what a user is required to have
const movieUsers = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('movieUsers', movieUsers, 'users');