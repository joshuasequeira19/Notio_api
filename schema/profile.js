const Joi = require('joi');
const {
    getStringEmpty,
    getStringMinLen,
    getStringMaxLen,
    getStringMustbeAlphaNum,
    getStringRequired,
} = require('./messages');

const createProfile = Joi.object({
    username: Joi.string()
        .required()
        .alphanum()
        .min(3)
        .max(30)
        .messages({
            "any.required": getStringRequired("Username"),
            "string.empty": getStringEmpty("Username"),
            "string.min": getStringMinLen("Username"),
            "string.max": getStringMaxLen("Username"),
            "string.alphanum": getStringMustbeAlphaNum("Username"),
        }),
    password: Joi.string()
        .required()
        .min(8)
        .max(30)
        .messages({
            "any.required": getStringRequired("Password"),
            "string.empty": getStringEmpty("Password"),
            "string.min": getStringMinLen("Password"),
            "string.max": getStringMaxLen("Password"),
        }),
    email: Joi.string()
        .required()
        .email()
        .messages({
            "any.required": getStringRequired("Email"),
            "string.empty": getStringEmpty("Email"),
            "string.email": "Email must be a valid email",
        }),
    first_name: Joi.string()
        .required()
        .min(2)
        .max(30)
        .messages({
            "any.required": getStringRequired("First name"),
            "string.empty": getStringEmpty("First name"),
            "string.min": getStringMinLen("First name"),
            "string.max": getStringMaxLen("First name"),
        }),
    // last_name: Joi.string()
    //     .min(2)
    //     .max(30)   
    //     .messages({
    //         "string.empty": getStringEmpty("Last name"),
    //         "string.min": getStringMinLen("Last name"),
    //         "string.max": getStringMaxLen("Last name"),
    //     }),
}).required();

/**
 * 
 * @param {Profile} createdProfile
 * @returns {Profile}
 */

const getCreateProfileResponse = (createdProfile) => ({
    id: createdProfile.id,
    username: createdProfile.username,
    email: createdProfile.email,
    first_name: createdProfile.first_name,
    last_name: createdProfile.last_name,
});

const loginRequest = Joi.object({
    username: Joi.string()
        .required()
        .alphanum()
        .min(3)
        .max(30)
        .messages({
            "any.required": getStringRequired("Username"),
            "string.empty": getStringEmpty("Username"),
            "string.min": getStringMinLen("Username"),
            "string.max": getStringMaxLen("Username"),
            "string.alphanum": getStringMustbeAlphaNum("Username"),
        }),
    password: Joi.string()
        .required()
        .min(8)
        .max(30)
        .messages({
            "any.required": getStringRequired("Password"),
            "string.empty": getStringEmpty("Password"),
            "string.min": getStringMinLen("Password"),
            "string.max": getStringMaxLen("Password"),
        }),
}).required();

module.exports = {
    createProfile,
    getCreateProfileResponse,
    loginRequest,
};