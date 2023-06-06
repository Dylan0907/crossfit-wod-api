const members = require ("../database/member")

const {v4:uuid} = require ("uuid")

const getAllMembers = (filterParams) => { 
    try {
        const allMembers = members.getAllMembers (filterParams)
        return allMembers
    } catch (error) {
        throw error
    }
}

const getOneMember = (memberId) => {
    try {
        const oneMember = members.getOneMember(memberId)
        return oneMember
    } catch (error) {
        throw error
    }
}

const createNewMember = (newMember) => {
    const memberToInsert = {
        ...newMember,
        id: uuid()
    }
    try {
        const createdNewMember = members.createNewMember(memberToInsert)
        return createdNewMember
    } catch (error) {
        throw error
    }
}

const updateOneMember = (memberToUpdate, memberId) => {
    try {
        const modifiedMember = members.updateOneMember(memberToUpdate, memberId)
        return modifiedMember
    } catch (error) {
        throw error
    }
}

const deleteOneMember = (memberId) => {
    try {
        members.deleteOneMember(memberId)
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