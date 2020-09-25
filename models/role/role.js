module.exports = (sequelize, type) => {
    return Roles = sequelize.define('roles', {
        name: { type: type.STRING },
        description: { type: type.STRING }
    });
}
