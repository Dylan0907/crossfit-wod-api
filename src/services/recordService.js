const Records = require("../database/recordModel")

const getRecordForWorkout = async (workoutId) => {
    try {
        const recordForWorkout = await Records.find({workout:workoutId})
        console.log(recordForWorkout)
        return recordForWorkout
    } catch (error) {
        throw error
    }
}

const createNewRecord = async (newRecord) => {
    const recordToInsert = new Records ({
        ...newRecord
    })
    try {
        const createdNewRecord = await recordToInsert.save()
        return createdNewRecord
    } catch (error) {
        throw error
    } 
}

const deleteOneRecord = async (workoutId) => {
    try {
       const deletedRecord = await Records.findOneAndDelete({workout: workoutId})
       return deletedRecord;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getRecordForWorkout,
    deleteOneRecord,
    createNewRecord
}