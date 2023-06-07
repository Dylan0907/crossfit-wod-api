const membersService = require ("../services/membersService")


const getAllMembers = (req, res) => {
    const {mode} = req.query
    try {
      const allMembers = membersService.getAllMembers({mode})
      res.send({ status: "OK", data: allMembers });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneMember = (req, res) => {
    const {
      params:{memberId}
    } = req
    if (!memberId) {
      return res
              .status(400)
              .send({
                status: "FAILED",
                data: {
                  error:
                    "Parameter ':memberId' can not be empty",
                },
              })
    }
    try {
      const member = membersService.getOneMember (memberId)
      res.send({ status: "OK", data: member });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewMember = (req, res) => {
    const {body} = req;
    if ( !body.name ||
      !body.gender ||
      !body.dateOfBirth ||
      !body.email ||
      !body.password) {
        return res
        .status(400)
        .send ({
          status: "FAILED",
          data: {
            error:
              "One of the following keys is missing or is empty in request body: 'name', 'gender', 'dateOfBirth', 'email', 'password'",
          },
        });
    }
    const newMember = {
      name: body.name,
      gender: body.gender,
      dateOfBirth: body.dateOfBirth,
      email: body.email,
      password: body.password
    }
    try {
      const createdMember = membersService.createNewMember(newMember);
      res.status(201).send({ status: "OK", data: createdMember });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };
  
  const updateOneMember = (req, res) => {
    const {
      body,
      params: {memberId}
    } = req
    if (!memberId) {
      return res
              .status(400)
              .send({
                status: "FAILED",
                data: {
                  error:
                    "Parameter ':memberId' can not be empty",
                },
              })
    }
    try {
      const updatedMember = membersService.updateOneMember (body, memberId)
      res.send({status:"Ok", data: updatedMember});
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }   
  };
  
  const deleteOneMember = (req, res) => {
    const {
      params:{memberId}
    } = req
    if (!memberId) {
      return res
              .status(400)
              .send({
                status: "FAILED",
                data: {
                  error:
                    "Parameter ':memberId' can not be empty",
                },
              })
    }
    try {
      membersService.deleteOneMember (memberId)
      res.status(204).send({ status: "OK"});
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }   
  };

  module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember
  }