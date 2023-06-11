const {
    KanbanBoardModel,
    KanbanColumnModel,
    KanbanCardModel,
} = require('../models/kanban');
const { HTTP500Error } = require("../common/exceptions");

/**
 * 
 * @param {number | string} getProfileId
 * @returns {KanbanBoard[]}
 * 
 */

function getUserBoards(profileId) {
    return KanbanBoardModel().where({ profile_id: profileId }); 
}

/**
 * @param {number | string} profileId
 * @returns {KanbanBoard[]}
 */

async function GetAllUserBoards(profileId) {
    let boards = null;
    try {
        boards= await getUserBoards(profileId);
    } catch (error) {
        console.log('Failed to get all user boards from db, err', error);
        throw new HTTP500Error('Failed to fetch your boards');
    }
    if (!boards) {
        throw new HTTP500Error('Failed to fetch your boards');
    }

    return boards;
}

module.exports = {
    GetAllUserBoards,
}