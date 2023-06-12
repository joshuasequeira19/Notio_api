const express = require("express");
const app = express();
const config = require("./config");
const middleware = require("./middleware");
const cookieParser = require("cookie-parser");

const healthController = require("./controller/health");
const authController = require("./controller/auth");
const kanbanController = require("./controller/kanban")

app.use(express.json());
app.use(middleware.log);


app.use(`${config.BASE}${healthController.mountUri}`, healthController.router);

app.use(cookieParser());
app.use(`${config.BASE}${kanbanController.mountUri}`, kanbanController.router);
app.use(`${config.BASE}${authController.mountUri}`, authController.router);

app.use(middleware.GlobalErrorHandler);

app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
});

