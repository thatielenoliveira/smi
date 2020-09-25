module.exports = (sequelize, type) => {
  return sequelize.define('patients', {
    fullName: { type: type.STRING, required: true },
    mothersName: { type: type.STRING, required: true },
    birthDate: { type: type.STRING, required: true },
    gender: { type: type.STRING, required: true },
    postalCode: { type: type.STRING, required: true },
    streetName: { type: type.STRING, required: true },
    houseNumber: { type: type.STRING, required: true },
    complement: { type: type.STRING, required: false },
    district: { type: type.STRING, required: true },
    city: { type: type.STRING, required: true },
    state: { type: type.STRING, required: true },
    phone: { type: type.STRING, required: true },
    liveWith: { type: type.STRING, required: true },
    emergencyPhone: { type: type.STRING, required: true }
  },
    {
      paranoid: true
    });
}

