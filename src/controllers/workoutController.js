const workoutService = require ("../services/workoutService")

const getAllWorkouts = (req, res) => {
  const {mode} = req.query
  try {
    const allWorkouts = workoutService.getAllWorkouts({mode})
    res.send({ status: "OK", data: allWorkouts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
  
  const getOneWorkout = (req, res) => {
    const {
      params:{workoutId}
    } = req
    if (!workoutId) {
      return res
              .status(400)
              .send({
                status: "FAILED",
                data: {
                  error:
                    "Parameter ':workoutId' can not be empty",
                },
              })
    }
    try {
      const workout = workoutService.getOneWorkOut (workoutId)
      res.send({ status: "OK", data: workout });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const createNewWorkout = (req, res) => {
    const {body} = req;
    if ( !body.name ||
      !body.mode ||
      !body.equipment ||
      !body.exercises ||
      !body.trainerTips) {
        return res
        .status(400)
        .send ({
          status: "FAILED",
          data: {
            error:
              "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
          },
        });
    }
    const newWorkout = {
      name: body.name,
      mode: body.mode,
      equipment: body.equipment,
      exercises: body.exercises,
      trainerTips: body.trainerTips
    }
    try {
      const createdWorkout = workoutService.createNewWorkout(newWorkout);
      res.status(201).send({ status: "OK", data: createdWorkout });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const updateOneWorkout = (req, res) => {
    const {
      body,
      params: {workoutId}
    } = req
    if (!workoutId) {
      return res
              .status(400)
              .send({
                status: "FAILED",
                data: {
                  error:
                    "Parameter ':workoutId' can not be empty",
                },
              })
    }
    try {
      const updatedWorkout = workoutService.updateOneWorkout (body, workoutId)
      res.send({status:"Ok", data: updatedWorkout});
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }   
  };
  
  const deleteOneWorkout = (req, res) => {
    const {
      params:{workoutId}
    } = req
    if (!workoutId) {
      return res
              .status(400)
              .send({
                status: "FAILED",
                data: {
                  error:
                    "Parameter ':workoutId' can not be empty",
                },
              })
    }
    try {
      workoutService.deleteOneWorkout (workoutId)
      res.status(204).send({ status: "OK"});
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }   
  };
  
  module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
  };