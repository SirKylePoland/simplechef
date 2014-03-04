// Get all of our friend data
var data = require('../recipe.json');
var models = require('../models');

exports.view = function(req, res){
	res.render('index', { message: req.flash('loginMessage') } );
};

exports.viewHome = function(req, res){
	models.Recipe
		.find({ 'trending': true })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('home', { "recipes": recipes });
	}
};

exports.viewHomeAll = function(req, res){
	models.Recipe
		.find()
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('home', { "recipes": recipes, all: true });
	}
};

exports.viewSettings = function(req, res){
	res.render('settings', req.user);
};

exports.viewRecipe = function(req, res) {
	var name = req.query.name;

	models.Recipe
		.find({ 'name': name })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('recipe', { "recipe": recipes[0],
						   "account": req.user } );
	}
}

exports.viewRecipeNew = function(req, res) {
	var name = req.params.name;

	models.Recipe
		.find({ 'name': name })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('recipe', { "recipe": recipes[0],
							   "account": req.user,
							   "btest": true } );
	}
}

exports.viewOverview = function(req, res){
	var name = req.params.name;

	models.Recipe
		.find({ 'name': name })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('overview', recipes[0] );
	}
};

exports.viewSteps = function(req, res){
	var name = req.params.name;

	models.Recipe
		.find({ 'name': name })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('step', recipes[0] );
	}
};

exports.viewIngredients = function(req, res){
	var name = req.params.name;

	models.Recipe
		.find({ 'name': name })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('ingredients', recipes[0] );
	}
};

exports.getTiles = function(req, res) {
	var category = req.params.category;

	switch(category) {
		case '1':
			models.Recipe
				.find({ 'trending': true })
				.exec(afterQuery);
			break;
		case '2':
			models.Recipe
				.find()
				.exec(afterQuery);
			break;
		default:
			console.log("No such category: " + category);
			break;
	}

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.json(recipes);
	}
}

exports.addRecipe = function(req, res) {
	var name = req.param('name');
	console.log(name);
	models.User.update( {_id: req.user._id}, { $push: { recipes: name } }, {}, afterUpdate );
	function afterUpdate(err, num) {
		if(err) console.log(err);
	}
}

exports.removeRecipe = function(req, res) {
	var name = req.param('name');
	models.User.update( {_id: req.user._id}, { $pull: { recipes: name } }, {}, afterUpdate );
	function afterUpdate(err, num) {
		if(err) console.log(err);
	}
}

exports.viewMyRecipes = function(req, res) {
	models.Recipe
		.find()
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);

		var tiles = {
			"recipes": [],
		};

		for( var i = 0; i < recipes.length; i++ ) {
			if( req.user.recipes.indexOf( recipes[i].name ) != -1 ) {
				tiles.recipes.push( recipes[i] );
			}
		}

		res.render('myrecipes', tiles);
	}
}

exports.viewTimer = function(req, res) {
	res.render('timer');
}

exports.viewHowto = function(req, res) {
	res.render('howto', req.user);
}

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
}

exports.viewSignup = function(req, res) {
	res.render('signup', { message: req.flash('signupMessage') });
}

exports.isLoggedIn = function(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}



