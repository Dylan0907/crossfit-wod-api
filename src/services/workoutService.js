const Workouts = require ("../database/workoutModel")

const getAllWorkouts = async (filterParams) => { 
    try {
        const allWorkouts = await Workouts.find ()
        return allWorkouts
    } catch (error) {
        throw error
    }
}

const getOneWorkOut = async (workoutId) => {
    try {
        const oneWorkout = await Workouts.findById(workoutId)
        return oneWorkout
    } catch (error) {
        throw error
    }
}

const createNewWorkout = async (newWorkout) => {
    const workoutToInsert = new Workouts ({
        ...newWorkout,
        createdAt: new Date().toLocaleString("en-US", {timezone: "UTC"}),
        updatedAt: new Date().toLocaleString("en-US", {timezone: "UTC"})
    })
    try {
        const createdNewWorkout = await workoutToInsert.save()
        return createdNewWorkout
    } catch (error) {
        throw error
    }
    
}

const updateOneWorkout = async (workoutToUpdate, workoutId) => {
    try {
        const modifiedWorkOut = await Workouts.updateOne(
            {_id: workoutId},
            {$set: {
                ...workoutToUpdate,
                updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
            }}
            )
        return modifiedWorkOut
    } catch (error) {
        throw error
    }
}

const deleteOneWorkout = async (workoutId) => {
    try {
       const deletedWorkout = await Workouts.findOneAndDelete(workoutId)
       return deletedWorkout;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkOut,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}