const Sequelize = require('sequelize');
sequelize = new Sequelize('sqlite:bank.db');

module.exports = sequelize;