require('dotenv').config();

const config = {
    PORT: process.env.PORT,
    BASE: process.env.BASE_URI,
    DB: {
        HOST: process.env.DB_HOST,
        NAME: process.env.DB_NAME,
        PORT: process.env.DB_PORT,
        USER: process.env.DB_USER,
        PW: process.env.DB_PW,
    },
    PW_SALT_RND: isNaN(process.env.PW_SALT_RND) ? 10 : parseInt(process.env.PW_SALT_RND),
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

module.exports = config;