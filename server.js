/**
 * Introduction to Human-Computer Interaction
 * Lab 2
 * --------------
 * Created by: Michael Bernstein
 * Last updated: December 2013
 */
<<<<<<< HEAD
var PORT = 3000;

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');
=======
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var routes = require('./routes/home');
>>>>>>> 49a48af2740bdc6ede22c7a5b7669abc6a157243

// Create the server instance
var app = express();

// Print logs to the console and compress pages we send
app.use(express.logger());
app.use(express.compress());

<<<<<<< HEAD
// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
app.use(express.static(__dirname + '/static'));
=======
// Add routes here
app.get('/', routes.view);
app.get('/home', routes.viewHome);
app.get('/recipe/:name', routes.viewRecipe);
app.get('/settings', routes.viewSettings);
app.get('/overview/:name', routes.viewOverview);
app.get('/step/:name', routes.viewSteps);
app.get('/ingredients/:name', routes.viewIngredients);
>>>>>>> 49a48af2740bdc6ede22c7a5b7669abc6a157243

// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});
