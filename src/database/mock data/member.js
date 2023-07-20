const DB = require("./db.json")
const saveToDatabase = require("./utils").saveToDatabase

const getAllMembers = (filterParams) => {
    try {
        let members = DB.members;
        if (filterParams.mode) {
            return DB.members.filter((member) =>
                member.mode.toLowerCase().includes(filterParams.mode)
            );
        }
        return members
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const getOneMember = (memberId) => {
    try {
        const oneMember =
        DB.members.find((member) => member.id === memberId)
        if (!oneMember) {
            throw {
                status: 400,
                message: `Member with the id '${memberId}' does not exists`,
            };
        }
        return oneMember
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }  
}

const updateOneMember = (changes, memberId) => {
    try {
        const indexMember=
        DB.members.findIndex((member) => member.id === memberId)
        if (indexMember === -1) {
            throw {
                status: 400,
                message: `Member with the id '${memberId}' does not exists`,
            };
        }
        const updatedMember = {
            ...DB.members[indexMember],
            ...changes,
        };
        DB.members[indexMember] = updatedMember;
        saveToDatabase(DB);
        return updatedMember;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }     
}

const createNewMember = (newMember) => {
    try {
        const isAlreadyAdded =
        DB.members.findIndex((member) => member.name === newMember.name) > -1;
        if (isAlreadyAdded) {
        throw {
            status: 400,
            message: `Member with the name '${newMember.name}' already exists`,
          };
        }
        DB.members.push(newMember);
        saveToDatabase(DB);
        return newMember;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const deleteOneMember = (memberId) => {
    try {
        const indexMember =
        DB.members.findIndex((member) => member.id === memberId)
        if (indexMember === -1) {
        throw {
            status: 400,
            message: `Member with the index '${memberId}' does not exists`,
          };
        }
        DB.members.splice(indexMember, 1)
        saveToDatabase(DB)
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }   
}

module.exports = {
    getAllMembers,
    getOneMember,
    updateOneMember,
    createNewMember,
    deleteOneMember
}
