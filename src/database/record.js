const DB = require("./db.json")

const getRecordForWorkout = (workoutId) => {
    try {
        const record = DB.records.filter((record) => record.workout === workoutId)
        if (!record) {
            throw {
                status: 400,
                message: `No record for the workout with id: '${workoutId}'`,
            };
        }
        return record
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

module.exports = { getRecordForWorkout };