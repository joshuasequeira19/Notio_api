const router = require("express").Router();
const mountUri = "/auth";

const ProfileService = require("../service/profile");
const { inputValidation, authMiddleware } = require("../middleware");
const {
    createProfile,
    getCreateProfileResponse,
    loginRequest,
} = require("../schema/profile");

router.post("/register", inputValidation(createProfile), async (req, res) => {
    try {
        const createdProfile = await ProfileService.createProfile(req.body);
        return res.json(getCreateProfileResponse(createdProfile));
    } catch (error) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
});

router.post("/login", inputValidation(loginRequest), async (req, res) => {
    try {
        const cookieTokens = await ProfileService.loginUser(req.body);
        for (const token of cookieTokens) {
            res.cookie(token.name, token.token, {
                maxAge: token.expiresIn * 1000,
                path: token.path,
                httpOnly: true,
            });
        }
        res.status(200).json({
            status: "success",
            message: "Logged in",
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
});

router.get("/refresh", authMiddleware, async (req, res) => {
    try {
        const accessToken = await ProfileService.refreshAccessToken(
            req.userDetails.id,
        );
        res.cookie(accessToken.name, accessToken.token, {
            maxAge: accessToken.expiresIn * 1000,
            path: accessToken.path,
            httpOnly: true,
        });
        res.status(200).json({
            status: "success",
        });
    } catch (error) {
        console.log(error);
        return res.json({
            err: error,
        });
        // return res.status(error.statusCode).json({
        //     status: error.status,
        //     message: error.message,
        // });
    }
});

module.exports = {
    router,
    mountUri,
};