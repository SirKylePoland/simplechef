// Get all of our friend data
var data = require('../recipe.json');

exports.view = function(req, res){
	res.render('index');
};

exports.viewHome = function(req, res){
	res.render('home', data );
};

exports.viewSettings = function(req, res){
	res.render('settings');
};

exports.viewRecipe = function(req, res) {
	var name = req.params.name;
	for( var i = 0; i < data.recipes.length; i++ ) {
		if( data.recipes[i].name === name ) {
			break;
		}
	}
	res.render('recipe', data.recipes[i] );
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