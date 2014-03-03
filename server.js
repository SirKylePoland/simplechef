/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');

var routes = require('./routes/home');

var local_database_name = 'simplechef';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

require('./passport')(passport);

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
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'simplechefisthebestwoooooooooo' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', routes.view);
app.get('/home', routes.isLoggedIn, routes.viewHome);
app.get('/recipe/:name', routes.isLoggedIn, routes.viewRecipe);
app.get('/settings', routes.isLoggedIn, routes.viewSettings);
app.get('/overview/:name', routes.isLoggedIn, routes.viewOverview);
app.get('/step/:name', routes.isLoggedIn, routes.viewSteps);
app.get('/ingredients/:name', routes.isLoggedIn, routes.viewIngredients);
app.get('/tiles/:category', routes.isLoggedIn, routes.getTiles);
app.post('/add', routes.isLoggedIn, routes.addRecipe);
app.post('/remove', routes.isLoggedIn, routes.removeRecipe);
app.get('/myrecipes', routes.isLoggedIn, routes.viewMyRecipes);
app.get('/timer', routes.isLoggedIn, routes.viewTimer);
app.get('/howto', routes.isLoggedIn, routes.viewHowto);
app.get('/origrec', routes.isLoggedIn, routes.origRec);
app.get('/origoverview', routes.isLoggedIn, routes.origOverview);
app.get('/origingredients', routes.isLoggedIn, routes.origIngredients);
app.get('/origstep', routes.isLoggedIn, routes.origStep);
app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
}));
app.get('/logout', routes.logout);
app.get('/signup', routes.viewSignup);
app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});