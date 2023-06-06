const record = require("../database/record")

const getRecordForWorkout = (workoutId) => {
    try {
        const recordForWorkout = record.getRecordForWorkout (workoutId)
        return recordForWorkout
    } catch (error) {
        throw error
    }
}

module.exports = {
    getRecordForWorkout
}