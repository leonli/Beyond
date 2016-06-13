var Sequelize = require("sequelize");

exports.User = {
    user_name: {type: Sequelize.STRING(32), allowNull: false, unique: true},
    password: {type: Sequelize.STRING(100), allowNull: false},
    phone_number: {type: Sequelize.STRING(15), allowNull: false}
};
