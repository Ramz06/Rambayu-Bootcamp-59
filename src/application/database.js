const { Sequelize } = require("sequelize");
const config = require("../../config/config")

require("dotenv").config();
const environment = process.env.NODE_ENV
const sequelize = new Sequelize(config[environment]);

module.exports = sequelize;
