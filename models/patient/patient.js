var Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
  return sequelize.define('patients', {

      fullName: {type: Sequelize.STRING, required: true},
      mothersName: {type: Sequelize.STRING, required: true},
      birthDate: {type: Sequelize.STRING, required: true},
      gender: {type: Sequelize.STRING, required: true},
      postalCode: {type: Sequelize.STRING, required: true},
      streetName: {type: Sequelize.STRING, required: true},
      houseNumber: {type: Sequelize.STRING, required: true},
      complement: {type: Sequelize.STRING, required: false},
      district: {type: Sequelize.STRING, required: true},
      city: {type: Sequelize.STRING, required: true},
      state: {type: Sequelize.STRING, required: true},
      phone: {type: Sequelize.STRING, required: true},
      liveWith: {type: Sequelize.STRING, required: true},
      emergencyPhone: {type: Sequelize.STRING, required: true}
    
  },
  { 
    paranoid: true
  });
}

