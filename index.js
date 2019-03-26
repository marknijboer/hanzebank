const express = require("express");
const routes = require("./lib/routes.js");
const middleware = require("./lib/middleware.js");
const path = require('path');
const app = express();

// Environment variable PORT or else port 3000
const port = process.env.PORT || 3000;

// Add middleware
middleware(app);

// Add routes
routes(app);

app.set('views', path.join(__dirname, 'lib/templates'));
app.set('view engine', 'twig');
app.use(express.static(path.join(__dirname, 'lib/public')))

// Synchronize database
require("./lib/models/sync.js");

// Start the app on the given port
app.listen(port, () => console.log(`Hanze banking app listening on port ${port}!`));