const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema ({
    name: {
        required: true,
        type: String
    },
    mode: {
        required: true,
        type : String
    },
    equipment : {
        required: true,
        type: [String]
    },
    exercises : {
        required: true,
        type: [String]
    },
    trainerTips : {
        required: true,
        type: [String]
    },
    createdAt: {
        required: true,
        type: String
    },
    updatedAt: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('Workou', workoutSchema)