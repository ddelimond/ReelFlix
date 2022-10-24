const mongoose = require('mongoose');

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