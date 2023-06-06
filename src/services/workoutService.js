const workout = require ("../database/workout")

const {v4:uuid} = require ("uuid")

const getAllWorkouts = (filterParams) => { 
    try {
        const allWorkouts = workout.getAllWorkouts (filterParams)
        return allWorkouts
    } catch (error) {
        throw error
    }
}

const getOneWorkOut = (workoutId) => {
    try {
        const oneWorkout = workout.getOneWorkout(workoutId)
        return oneWorkout
    } catch (error) {
        throw error
    }
}

const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", {timezone: "UTC"}),
        updatedAt: new Date().toLocaleString("en-US", {timezone: "UTC"})
    }
    try {
        const createdNewWorkout = workout.createNewWorkout(workoutToInsert)
        return createdNewWorkout
    } catch (error) {
        throw error
    }
    
}

const updateOneWorkout = (workoutToUpdate, workoutId) => {
    
    try {
        const modifiedWorkOut = workout.updateOneWorkout(workoutToUpdate, workoutId)
        return modifiedWorkOut
    } catch (error) {
        throw error
    }
}

const deleteOneWorkout = (workoutId) => {
    
    try {
        workout.deleteOneWorkout(workoutId)
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