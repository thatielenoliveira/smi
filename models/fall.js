module.exports = (sequelize, type) => {
    const User = require('./user')(sequelize, type);
  
    const Fall = sequelize.define('falls', {
      datetime: { type: type.DATE },
      rate: { type: type.REAL },
    }, { paranoid: true });
  
    Fall.belongsTo(User);
  
    return Fall;
  }