const ApiController = require("./controllers/api.js");
const HttpController = require("./controllers/http.js");
const OfficeController = require("./controllers/office.js");

// Bind a controller to each route
const routes = app => {
    
    // HTTP controllers
    app.get('/', HttpController.index);
    app.get('/login', HttpController.login);
    app.get('/register', HttpController.register);
    
    // API controllers
    app.post('/api/v1/register', ApiController.register);
    app.post('/api/v1/login/1', ApiController.login);
    app.post('/api/v1/login/2', ApiController.authorizeSms);
    app.get('/api/v1/isloggedin', ApiController.isLoggedIn);
    
    app.get('/secret/b/a/c/k/o/f/f/i/c/e', OfficeController.index);
    app.post('/secret/b/a/c/k/o/f/f/i/c/e/activation', OfficeController.activation);
};

module.exports = routes;