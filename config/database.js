


var Sequelize = require('sequelize');


module.exports.connection = new Sequelize('smi', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  });

