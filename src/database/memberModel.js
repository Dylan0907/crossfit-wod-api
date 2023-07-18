const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    gender: {
        required: true,
        type : String
    },
    dateOfBirth: {
        required: true,
        type : String
    },
    email: {
        required: true,
        type : String
    },
    password: {
        required: true,
        type : String
    }
})

module.exports = mongoose.model('Member', memberSchema)