module.exports = (sequelize, type) => {
  const Role = require('./role')(sequelize, type);

  const User = sequelize.define('users', {
    username: { type: type.STRING },
    email: { type: type.STRING },
    password: { type: type.STRING },
    resetPasswordToken: { type: type.STRING },
    resetPasswordExpires: { type: type.DATE }
  }, { paranoid: true });

  User.belongsTo(Role);

  return User;
}