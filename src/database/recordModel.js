const mongoose = require ("mongoose") 


const recordSchema = new mongoose.Schema({
    memberId: {
        required: true,
        type: String
    },
    workout: {
        required: true,
        type: String
    },
    record: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('Record',recordSchema)