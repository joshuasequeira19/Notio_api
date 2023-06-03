// generator function for Joi schema error messages

const getStringRequired = (fieldName) => `${fieldName} is required`;
const getStringEmpty = (fieldName) => `${fieldName} cannot be empty`;
const getStringMinLen = (fieldName) => `${fieldName} must be at least {#limit} characters long`;
const getStringMaxLen = (fieldName) => `${fieldName} must be at most {#limit} characters long`;
const getStringMustbeAlphaNum = (fieldName) => `${fieldName} must only contain alpha-numeric characters`;

module.exports = {
    getStringRequired,
    getStringEmpty,
    getStringMinLen,
    getStringMaxLen,
    getStringMustbeAlphaNum,
};