const bodyParser = require("body-parser");
const session = require("express-session");
const express = require("express");
const path = require("path");

// Add global middleware to the application
const middleware = app => {
    
    // parse application/x-www-form-urlencoded POST-data
    app.use(bodyParser.urlencoded({ extended: false }));
    
    // parse application/json POST-data
    app.use(bodyParser.json());
    
    // Setup session support
    app.use(session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      cookie: { 
          
          // Inactive sessions stay valid for thirty minutes
          maxAge: 1800000 
      },
      saveUninitialized: true
    }));
    
    // Set template folder
    app.set('views', path.join(__dirname, 'www/templates'));
    
    // Configure template engine
    app.set('view engine', 'twig');
    
    // Set the static web folder
    app.use(express.static(path.join(__dirname, 'www/public')));
};

module.exports = middleware;