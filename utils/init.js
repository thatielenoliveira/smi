const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

require('dotenv').config();

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
});

const RoleModel = require('../models/role')(connection, Sequelize);
const UserModel = require('../models/user')(connection, Sequelize);

connection.sync({ force: true }).then(() => {
    RoleModel.bulkCreate(
        [
            {
                name: 'Admin',
                description: 'Administrator'
            },
            {
                name: 'Monitor',
                description: 'Patient Monitor'
            }
        ]
    ).then((roles) => {
        console.log('Roles Successfully Created');
        
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
        const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt);

        RoleModel.findOne({ name: 'Admin' }).then((role) => {
            UserModel.create({
                username: process.env.ADMIN_EMAIL,
                email: process.env.ADMIN_EMAIL,
                password: hash
            }).then((user) => {
                user.roleId = role.id;
    
                user.save().then(() => {
                    console.log('Admin User Successfully Created');
                    // UserModel.findOne({ where: { email: 'top.eng@uea.edu.br' }, include: [{ model: RoleModel }] }).then((a) => {
                    //     console.log(a);
                    // });
                }).catch((error) => {
                    console.error(error);
                })
            }, (error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
    }, (error) => {
        console.error(error);
    });
});