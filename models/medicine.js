module.exports = (sequelize, type) => {
    const Patient = require('./patient')(sequelize, type);

    const Medicine = sequelize.define('medicines', {
    name: { type: type.STRING, required: true },
    amount: { type: type.STRING, required: true },
    days: { type: type.STRING, required: true },
    schedule:  { type: type.TIMESTAMP, required: true }
    }, { paranoid: true });

    Medicine.belongsTo(Patient);

    return Medicine;
  }
  

  