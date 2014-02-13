var data = require('../recipe.json');

exports.viewRecipe = function(req, res) {
	// controller code goes here
	var name = req.params.name;

	for( var i = 0; i < data.recipes.length; i++ ) {
		if( data.recipes[i].name === name ) {
			break;
		}
	}

	res.render('recipe', data.recipes[i] );
}