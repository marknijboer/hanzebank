const Sequelize = require('sequelize');
const connection = require("./connect.js");

const Client = connection.define('Client', {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
    },
});

module.exports = Client;