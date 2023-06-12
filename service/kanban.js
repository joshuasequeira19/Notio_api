const {
    KanbanBoardModel,
    KanbanColumnModel,
    KanbanCardModel,
} = require("../models/kanban");
const { HTTP500Error } = require("../common/exceptions");

/**
 * @param {number | string} profileId
 * @returns {KanbanBoard[]}
 */
function getUserBoards(profileId) {
    return KanbanBoardModel().where({ profile_id: profileId });
}

/**
 * @param {CreateBoard} board
 * @param {number | string} profileId
 * @returns {KanbanBoard}
 */
async function CreateKanbanBoard(board, profileId) {
    let createdBoard = null;
    try {
        [createdBoard] = await KanbanBoardModel()
            .insert({
                title: board.title,
                description: board.description,
                profile_id: profileId,
            })
            .returning("*");
    } catch (error) {
        console.log("Failed to create board in db, err:", error);
        throw new HTTP500Error("Failed to create board");
    }
    if (!createdBoard) {
        throw new HTTP500Error("Failed to create board");
    }

    return createdBoard;
}

/**
 * @param {number | string} profileId
 * @returns {KanbanBoard[]}
 */
async function GetAllUserBoards(profileId) {
    let boards = null;
    try {
        boards = await getUserBoards(profileId);
    } catch (error) {
        console.log("Failed to get all user boards from db, err:", error);
        throw new HTTP500Error("Failed to fetch your boards");
    }
    if (!boards) {
        throw new HTTP500Error("Failed to fetch your boards");
    }

    return boards;
}

/**
 * @typedef {Object} CreateBoard
 * @property {string} title
 * @property {string} description
 */

module.exports = {
    CreateKanbanBoard,
    GetAllUserBoards,
};