// Get all of our friend data
var data = require('../recipe.json');
var accounts = require('../accounts.json');

exports.view = function(req, res){
	res.render('index');
};

exports.viewHome = function(req, res){
	var tiles = {
		"recipes": [],
	};

	var category = "Trending";

	for( var i = 0; i < data.recipes.length; i++ ) {
		if( category === 'Trending' && data.recipes[i].trending ) {
			tiles.recipes.push( data.recipes[i] );
		}
		else if( category === 'All' ) {
			tiles.recipes.push( data.recipes[i] );
		}
		else if ( category === 'My Recipes' ) {
			if( accounts.recipes.indexOf( data.recipes[i].name ) != -1 ) {
				tiles.recipes.push( data.recipes[i] );
			}
		}
	}

	res.header('Cache-Control', 'private, must-revalidate, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
	res.render('home', tiles );
};

exports.viewSettings = function(req, res){
	res.render('settings', accounts);
};

exports.viewRecipe = function(req, res) {
	var name = req.params.name;
	for( var i = 0; i < data.recipes.length; i++ ) {
		if( data.recipes[i].name === name ) {
			break;
		}
	}
	res.render('recipe', { "recipe": data.recipes[i],
						   "account": accounts } );
}

exports.viewOverview = function(req, res){
	var name = req.params.name;
	for( var i = 0; i < data.recipes.length; i++ ) {
		if( data.recipes[i].name === name ) {
			break;
		}
	}
	res.render('overview', data.recipes[i] );
};

exports.viewSteps = function(req, res){
	var name = req.params.name;
	for( var i = 0; i < data.recipes.length; i++ ) {
		if( data.recipes[i].name === name ) {
			break;
		}
	}
	res.render('step', data.recipes[i] );
};

exports.viewIngredients = function(req, res){
	var name = req.params.name;
	for( var i = 0; i < data.recipes.length; i++ ) {
		if( data.recipes[i].name === name ) {
			break;
		}
	}
	res.render('ingredients', data.recipes[i] );
};

exports.getTiles = function(req, res) {
	var category = req.params.category;
	var tiles = [];
	for( var i = 0; i < data.recipes.length; i++ ) {
		if( category == 1 && data.recipes[i].trending ) {
			tiles.push( data.recipes[i] );
		}
		else if( category == 2 ) {
			tiles.push( data.recipes[i] );
		}
		else if ( category == 3 ) {
			if( accounts.recipes.indexOf( data.recipes[i].name ) != -1 ) {
				tiles.push( data.recipes[i] );
			}
		}
	}
	res.json(tiles);
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
	var tiles = {
		"recipes": [],
	};

	var category = "Trending";

	for( var i = 0; i < data.recipes.length; i++ ) {
		if( accounts.recipes.indexOf( data.recipes[i].name ) != -1 ) {
			tiles.recipes.push( data.recipes[i] );
		}
	}

	res.render('myrecipes', tiles);
}

exports.viewTimer = function(req, res) {
	res.render('timer');
}