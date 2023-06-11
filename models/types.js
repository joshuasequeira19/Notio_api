/**
 * @typedef {Object} Profile
 * @property {number} id
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} KanbanBoard
 * @property {number} id
 * @property {number} profile_id
 * @property {string} title
 * @property {string} description
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} KanbanColumn
 * @property {number} id
 * @property {number} board_id
 * @property {string} title
 * @property {string} description
 * @property {number} position
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * @typedef {Object} KanbanCard
 * @property {number} id
 * @property {number} column_id
 * @property {string} title
 * @property {string} description
 * @property {number} position
 * @property {Date} created_at
 * @property {Date} updated_at
 */