// Get all of our friend data
var data = require('../recipe.json');
var accounts = require('../accounts.json');
var models = require('../models');

exports.view = function(req, res){
	res.render('index');
};

exports.viewHome = function(req, res){
	var tiles = {
		"recipes": [],
	};

	models.Recipe
		.find({ 'trending': true })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('home', { "recipes": recipes });
	}
};

exports.viewSettings = function(req, res){
	res.render('settings', accounts);
};

exports.viewRecipe = function(req, res) {
	var name = req.params.name;

	models.Recipe
		.find({ 'name': name })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('recipe', { "recipe": recipes[0],
						   "account": accounts } );
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
	accounts.recipes.push(name);
}

exports.removeRecipe = function(req, res) {
	var name = req.param('name');
	var index = accounts.recipes.indexOf(name);
	if( index != -1 ) {
		accounts.recipes.splice(index, 1);
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
			if( accounts.recipes.indexOf( recipes[i].name ) != -1 ) {
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
	res.render('howto', accounts);
}

exports.origRec = function(req, res) {
	models.Recipe
		.find({ 'name': "Guacamole" })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		res.render('recipe', { 	"recipe": recipes[0],
								"account": accounts,
								"orig": true } );
	}
}

exports.origOverview = function(req, res) {
	models.Recipe
		.find({ 'name': "Guacamole" })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		recipes[0]['orig'] = true;
		res.render('overview', recipes[0] );
	}
}

exports.origIngredients = function(req, res) {
	models.Recipe
		.find({ 'name': "Guacamole" })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		recipes[0]['orig'] = true;
		res.render('ingredients', recipes[0] );
	}
}

exports.origStep = function(req, res) {
	models.Recipe
		.find({ 'name': "Guacamole" })
		.exec(afterQuery);

	function afterQuery(err, recipes) {
		if(err) console.log(err);
		recipes[0]['orig'] = true;
		res.render('step', recipes[0] );
	}
}





