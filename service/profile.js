const ProfileModel = require('../models/profile');

const {
    HTTP500Error,
    HTTP400Error,
    HTTP401Error,
    // HTTP403ERROR,
} = require('../common/exceptions');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
// Import breaking due to circular dependency, TODO: fix
// const { mountUri: AuthMountUri } = require("../controller/auth");

const getHashedPw = (password) => bcrypt.hash(password, config.PW_SALT_RND);
const verifyPw = (password, hashedPw) => bcrypt.compare(password, hashedPw);

const ACCESS_TOKEN_EXPIRY = 60 * 60;
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 7;

/**
 * @param {number | string} userId
 * @param {string} username
 * @returns {string}
 */
const createAccessTokenjwt = (userId, userName) =>
    jwt.sign(
        {
            id: userId,
            username: userName,
        },
        config.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY, // 1 hour
        },
    );

/**
 * @param {number | string} userId
 * @param {string} 
 */
const createRefreshTokenjwt = (userId) =>
    jwt.sign(
        {
            id: userId,
        },
        config.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY, // 7 days
        },
    );

/**
 * @param {number | string} userId
 * @param {string} userName
 * @returns {Token}
 */
const createAccessToken = (userId, userName) => ({
    name: "accessToken",
    token: createAccessTokenJwt(userId, userName),
    expiresIn: ACCESS_TOKEN_EXPIRY,
    path: config.BASE,
});

/**
 * @param {number | string} userId
 * @returns {Token}
 */
const createRefreshToken = (userId) => ({
    name: "refreshToken",
    token: createRefreshTokenJwt(userId),
    expiresIn: REFRESH_TOKEN_EXPIRY,
    path: `${config.BASE}/auth/refresh}`,
});



const VerifyAcessToken = (token) => jwt.verify(token, config.ACCESS_TOKEN_SECRET);
const VerifyRefreshToken = (token) => jwt.verify(token, config.REFRESH_TOKEN_SECRET);

/**
 * @param {(number | string)} userId
 * @returns {Profile}
 */
function GetProfileById(userId) {
    return ProfileModel().where({ id: userId }).first();
}

/**
 * @param {string} userName
 * @returns {Profile}
 */
function getProfileByUsername(userName) {
    return ProfileModel().where({ username: userName }).first();
}

/**
 * @param {string} email
 * @returns {Profile}
 */
function getProfileByEmail(email) {
    return ProfileModel().where({ email: email }).first();
}

/**
 * @param {string} email
 * @param {string} userName
 * @returns {Profile}
 */
function getProfileByEmailAndUsername(email, userName) {
    return ProfileModel().where({ email: email, username: userName }).first();
}

/**
 * @param {CreateProfile} profileDetails
 * @returns {Profile}
 */
async function CreateProfile(profileDetails) {
    let existingUser = null;
    try {
        existingUser = await getProfileByEmailAndUsername(
            profileDetails.email,
            profileDetails.username,
        );
    } catch (error) {
        console.log("Failed to get profile by email and username from db", error);
        throw new HTTP500Error("Failed to create profile");
    }

    if (existingUser) {
        throw new HTTP400Error("User already exists");
    }

    let hashedPw = null;
    try {
        hashedPw = await getHashedPw(profileDetails.password);
    } catch (error) {
        console.log("Failed to hash password ", error);
        throw new HTTP500Error("Failed to create profile");
    }

    let createdProfile = null;
    try {
        [createdProfile] = await ProfileModel()
            .insert({
                username: profileDetails.username,
                email: profileDetails.email,
                password: hashedPw,
                first_name: profileDetails.first_name,
            })
            .returning("*");
    } catch (error) {
        console.log("Failed to create profile in db", error);
        throw new HTTP500Error("Failed to create profile");
    }

    return createdProfile;

}

/**
 * @param {LoginUser} profileDetails
 * @returns {Array<Token>} Return[0] is the access token, Return[1] is the refresh token
 */
async function LoginUser(profileDetails) {
    let userProfile = null;
    try {
        userProfile = await getProfileByUsername(profileDetails.username);
    } catch (error) {
        console.log("Failed to get profile by username from db");
        throw new HTTP500Error("Failed to login user");
    }

    if (!userProfile || !(await verifyPw(profileDetails.password, userProfile.password))) {
        throw new HTTP400Error("Invalid password"); // If user does exist in db, dont tell them this info. Instead say Invalid password.
    }

    const accessToken = createAccessTokenjwt(userProfile.id, userProfile.username);
    const refreshToken = createRefreshTokenjwt(userProfile.id);

    return [
        createAccessToken(userProfile.id, userProfile.username),
        createRefreshToken(userProfile.id),
    ];
}

/**
 * @param {number | string} profileId 
 * @returns {Token} Return[0] is the access token, Return[1] is the refresh token ??
 * */

async function RefreshAccessToken(profileId) {
    let userProfile = null;

    try {
        userProfile = await GetProfileById(profileId);
    } catch (error) {
        console.log("Failed to get profile by id from db", error);
        throw new HTTP500Error("Failed to refresh user access token");
    }
    if (!userProfile) {
        throw new HTTP401Error("Unauthorized");
    }
    
    return createAccessToken(userProfile.id, userProfile.username);
    

}

module.exports = {
    GetProfileById,
    CreateProfile,
    LoginUser,
    RefreshAccessToken,
    VerifyAcessToken,
    VerifyRefreshToken,
};

/**
 * @typedef {Object} CreateProfile
 * @property {string} username
 * @property {string} password
 * @property {string} email
 * @property {string} first_name
 */

/**
 * @typedef {Object} LoginUser
 * @property {string} username
 * @property {string} password
 */

/**
 * @typedef {Object} Token
 * @property {string} token
 * @property {string} name
 * @property {string} path
 * @property {number} expiresIn
 */