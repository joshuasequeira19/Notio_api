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
            .max(30)
            .required()
            .messages({
                "any.required": getStringRequired("Description"),
                "string.empty": getStringEmpty("Description"),
                "string.min": getStringMinLen("Description"),
                "string.max": getStringMaxLen("Description"),
            }),
});

module.exports = {
    createKanbanBoard,
}