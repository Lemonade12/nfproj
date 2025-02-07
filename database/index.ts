import { Sequelize } from "sequelize";
const dbConfig = require("./db.config");
const initModels = require("./models/init-models");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  timezone: dbConfig.timezone,
});

const db = initModels(sequelize);

db.sequelize = sequelize;

module.exports = db;
