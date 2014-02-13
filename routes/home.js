// Get all of our friend data
var data = require('../recipe.json');

exports.view = function(req, res){
	//console.log(data);
	res.render('home', data );
};