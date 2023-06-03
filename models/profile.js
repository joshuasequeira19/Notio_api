const db = require("../db");
const {knex} = require("knex");

/**
 * @returns {Knex.QueryBuilder<Profile, {}>}
 */

const Profile = () => db("profile");

module.exports = Profile;