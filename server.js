/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var routes = require('./routes/home');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'static/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', routes.view);
app.get('/home', routes.viewHome);
app.get('/recipe/:name', routes.viewRecipe);
app.get('/settings', routes.viewSettings);
app.get('/overview/:name', routes.viewOverview);
app.get('/step/:name', routes.viewSteps);
app.get('/ingredients/:name', routes.viewIngredients);
app.get('/tiles/:category', routes.getTiles);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
