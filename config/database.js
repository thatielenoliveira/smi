const Sequelize = require('sequelize');

require('dotenv').config();

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
});

const PatientModel = require('../models/patient')(connection, Sequelize);
const MedicineModel = require('../models/medicine')(connection, Sequelize);
const RoleModel = require('../models/role')(connection, Sequelize);
const UserModel = require('../models/user')(connection, Sequelize);
const FallModel = require('../models/fall')(connection, Sequelize);
const HeartRateModel = require('../models/heartRate')(connection, Sequelize);

connection.sync({ alter: { drop: false } }).then(() => {
  console.log('Database and Tables Synced');
});

module.exports = { PatientModel, MedicineModel, RoleModel, UserModel, FallModel, Sequelize, HeartRateModel };