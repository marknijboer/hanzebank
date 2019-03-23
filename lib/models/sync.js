const connection = require("./connect.js");

// List of tables
const Client = require("./Client.js");

// Synchronize the database and all its tables that where 'required' in this file
sequelize.sync();