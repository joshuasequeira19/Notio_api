const router = require("express").Router();
const  mountUri = "/health";

router.get("/", (req, res) => {
    res.status(200).send("OK");
});

module.exports = {
    router,
    mountUri,
};