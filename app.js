const express = require("express");
const app = express();
const config = require("./config");
const middleware = require("./middleware");
const cookieParser = require("cookie-parser");

const healthController = require("./controller/health");
const authController = require("./controller/auth");

app.use(express.json());
app.use(middleware.log);


app.use(`${config.BASE}${healthController.mountUri}`, healthController.router);

app.use(cookieParser());
app.use(`${config.BASE}${authController.mountUri}`, authController.router);

app.use(middleware.globalErrorHandler);

app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
});

