module.exports = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  dialect: "mysql",
  timezone: "+09:00",
  pool: {
    max: 15,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
};
