const members = require ("../database/member")
const Members = require ("../database/memberModel")
const {v4:uuid} = require ("uuid")

const getAllMembers = async (filterParams) => { 
    try {
        const allMembers =  await Members.find ()
        return allMembers
    } catch (error) {
        throw error
    }
}

const getOneMember = async (memberId) => {
    try {
        const oneMember = await Members.findById(memberId)
        return oneMember
    } catch (error) {
        throw error
    }
}

const createNewMember = async (newMember) => {
    const memberToInsert = new Members ({
        ...newMember
    })
    try {
        const newMember = await memberToInsert.save();
        return newMember
    } catch (error) {
        throw error
    }
}

const updateOneMember = async (memberToUpdate, memberId) => {
    try {
        const modifiedMember = await Members.updateOne(
            {_id: memberId},
            {$set: memberToUpdate}
            )
        return modifiedMember
    } catch (error) {
        throw error
    }
}

const deleteOneMember = async (memberId) => {
    try {
       const deletedMember = await Members.findByIdAndDelete(memberId)
       return deletedMember
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember
}