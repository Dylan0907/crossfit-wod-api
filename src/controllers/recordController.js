const recordService = require ("../services/recordService")

const getRecordForWorkout = async (req, res) => {
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
      const record = await  recordService.getRecordForWorkout (workoutId)
      res.send({ status: "OK", data: record });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const createNewRecord = async (req, res) => {
    const {body} = req;
    if ( !body.workout ||
      !body.record ||
      !body.memberId) {
        return res
        .status(400)
        .send ({
          status: "FAILED",
          data: {
            error:
              "One of the following keys is missing or is empty in request body: 'workout', 'record', 'memberId'",
          },
        });
    }
    const newRecord = {
      record: body.record,
      workout: body.workout,
      memberId: body.memberId,
    }
    try {
      const createdNewRecord = await recordService.createNewRecord(newRecord);
      res.status(201).send({ status: "OK", data: createdNewRecord });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const deleteOneRecord = async (req, res) => {
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
      await  recordService.deleteOneRecord (workoutId)
      res.status(204).send({ status: "OK"});
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }   
  };

  module.exports = {
    getRecordForWorkout,
    createNewRecord,
    deleteOneRecord
  }