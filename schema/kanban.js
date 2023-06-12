const Joi = require('joi');
const {
    getStringRequired,
    getStringEmpty,
    getStringMinLen,
    getStringMaxLen,
} = require("./messages");

const createKanbanBoard = Joi.object({

    title: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                "any.required": getStringRequired("Title"),
                "string.empty": getStringEmpty("Title"),
                "string.min": getStringMinLen("Title"),
                "string.max": getStringMaxLen("Title"),
            }),

    description: Joi.string()
            .min(3)
            .max(50)
            .required()
            .messages({
                "any.required": getStringRequired("Description"),
                "string.empty": getStringEmpty("Description"),
                "string.min": getStringMinLen("Description"),
                "string.max": getStringMaxLen("Description"),
            }),
});

/**
 * @param {KanbanBoard} kanbanBoard
 * @returns {KanbanBoard}
 */

const getKanbanBoardResponse = (kanbanBoard) => ({
    id: kanbanBoard.id,
    title: kanbanBoard.title,
    description: kanbanBoard.description,  
    created_at: kanbanBoard.created_at,
    updated_at: kanbanBoard.updated_at,
    
    columns: kanbanBoard.columns || [],
});

/**
 * @param {KanbanBoard} KanbanBoard 
 * @returns {KanbanBoard}
 */

const getCreateKanbanRresponse = (createKanban) => getKanbanBoardResponse(createdKanban);

/**
 * @param {KanbanBoard[]} kanbanBoards
 * @returns {KanbanBoard[]}
 */

const getManyKanbanBoardsResponse = (kanbanBoards) =>
    kanbanBoards.map((kanbanBoard) => getKanbanBoardResponse(kanbanBoard));


module.exports = {
    createKanbanBoard,
    getKanbanBoardResponse,
    getCreateKanbanRresponse,
    getManyKanbanBoardsResponse,
};