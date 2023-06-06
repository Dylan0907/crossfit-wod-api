const DB = require("./db.json")
const saveToDatabase = require("./utils").saveToDatabase

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Tommy V  
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */

const getAllWorkouts = (filterParams) => {
    try {
        let workouts = DB.workouts;
        if (filterParams.mode) {
            return DB.workouts.filter((workout) =>
                workout.mode.toLowerCase().includes(filterParams.mode)
            );
        }
        return workouts
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
    
}

const getOneWorkout = (workoutId) => {
    try {
        const oneWorkout =
        DB.workouts.find((workout) => workout.id === workoutId)
        if (!oneWorkout) {
            throw {
                status: 400,
                message: `Workout with the index '${workoutId}' does not exists`,
            };
        }
        return oneWorkout
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
    
}

const updateOneWorkout = (changes, workoutId) => {
    
    try {
        const indexWorkout =
        DB.workouts.findIndex((workout) => workout.id === workoutId)
        if (indexWorkout === -1) {
            throw {
                status: 400,
                message: `Workout with the index '${workoutId}' does not exists`,
            };
        }
        const updatedWorkout = {
            ...DB.workouts[indexWorkout],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        };
        DB.workouts[indexWorkout] = updatedWorkout;
        saveToDatabase(DB);
        return updatedWorkout;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
      
}

const createNewWorkout = (newWorkout) => {
    try {
        const isAlreadyAdded =
        DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
        if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Workout with the name '${newWorkout.name}' already exists`,
          };
        }
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const deleteOneWorkout = (workoutId) => {
    
    try {
        const indexWorkout =
        DB.workouts.findIndex((workout) => workout.id === workoutId)
        if (indexWorkout === -1) {
        throw {
            status: 400,
            message: `Workout with the index '${workoutId}' does not exists`,
          };
        }
        DB.workouts.splice(indexWorkout, 1)
        saveToDatabase(DB)
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
    
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}