module.exports = (sequelize, type) => {
    const User = require('./user')(sequelize, type);
  
    const HeartRate = sequelize.define('heartRate', {
      datetime: { type: type.DATE },
      rate: { type: type.REAL },
    }, { paranoid: true });
  
    HeartRate.belongsTo(User);
  
    return HeartRate;
  }