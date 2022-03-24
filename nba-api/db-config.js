const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.LOCAL_DB_DATABASE, process.env.LOCAL_DB_USER, process.env.LOCAL_DB_PASSWORD, {
    host: process.env.LOCAL_DB_HOST,
    dialect: process.env.LOCAL_DIALECT
  });

const db = {};

//connection test
// const testConnection = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//       sequelize.close()
//     } catch (error) {
//       sequelize.close()
//       console.error('Unable to connect to the database:', error);
//     }
// }

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Players = require("./models/players.js")(sequelize, Sequelize);

module.exports = db;