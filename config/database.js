


const Sequelize = require('sequelize');
require('dotenv').config();
 

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
  });

const PatientModel = require('../models/patient/patient')(connection, Sequelize);

connection.sync().then(() => {
  console.log('Database and Tables Synced');
});

module.exports = { PatientModel };