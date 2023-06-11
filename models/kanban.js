const db = require("../db");
const { Knex } = require("knex");

/**
 * @returns {Knex.QueryBuilder<KanbanBoard, {}>}
 * 
 */
const KanbanBoard = () => db("kanban_board");

/**
 * @returns {Knex.QueryBuilder<KanbanColumn, {}>}
 */
const KanbanColumn = () => db("kanban_column");

/**
 * @returns {Knex.QueryBuilder<KanbanCard, {}>} 
 */
const KanbanCard = () => db("kanban_card");

module.exports = {
    KanbanBoardModel: KanbanBoard,
    KanbanColumnModel: KanbanColumn,
    KanbanCardModel: KanbanCard,
};