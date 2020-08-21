


var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

SALT_FACTOR = 10;

var connection = new Sequelize('smi', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  });

// connection.sync().then(function(){
//     console.log('DB connection sucessful.');
//   }, function(err){
//     console.log(err);
// });

var Users = connection.define('users', {

    username: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    resetPasswordToken: {type: Sequelize.STRING},
    resetPasswordExpires: {type: Sequelize.DATE}
   
});

module.exports = Users;

// const salt = bcrypt.genSaltSync(SALT_FACTOR);
// const hash = bcrypt.hashSync('sudoadmin123456', salt);
              
// var pass = hash;

// connection.sync().then(function () {
//     Users.create({
//        username: 'testedois',
//        email: 'topereira@uea.edu.br',
//        password: pass
//     })
// });

