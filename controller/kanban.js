const router = require("express").Router();
const mountUri = "/kanban";

const KanbanService = require("../service/kanban");
const { InputValidation, AuthMiddleware } = require("../middleware");
const {
    createKanbanBoard,
    getCreateKanbanRresponse,
    getManyKanbanBoardsResponse,
} = require("../schema/kanban");

router.post(
    "/",
    AuthMiddleware,
    InputValidation(createKanbanBoard),
    async (req, res) => {
        try {
            const createdKanban = await KanbanService.CreateKanbanBoard(
                req.body,
                req.userDetails.id,
            );
            return res.json(getCreateKanbanRresponse(createdKanban));
        } catch (error) {
            return res.status(error.statusCode).json({
                status: error.status,
                message: error.message,
            });
        }
    },
);

router.get("/all", AuthMiddleware, async (req, res) => {
    try {
        const boards = await KanbanService.GetAllUserBoards(req.userDetails.id);
        return res.json(getManyKanbanBoardsResponse(boards));
    } catch (error) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
});

module.exports = {
    router,
    mountUri,
};