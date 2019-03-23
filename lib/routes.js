const ApiController = require("./controllers/api.js");
const HttpController = require("./controllers/http.js");

// Bind a controller to each route
const routes = app => {
    
    // HTTP controllers
    app.get('/', HttpController.index);
    //app.get('/login', HttpController.login);
    //app.get('/register', HttpController.register);
    
    // API controllers
    app.post('/api/v1/register', ApiController.register);
    app.post('/api/v1/login', ApiController.login);
    app.get('/api/v1/isloggedin', ApiController.isLoggedIn);
};

module.exports = routes;