var Mongoose = require('mongoose');

var StepSchema = new Mongoose.Schema({
	"num": Number,
	"desc": String
});

var IngredientSchema = new Mongoose.Schema({
	"step": String,
	"name": String,
	"amount": String
});

var RecipeSchema = new Mongoose.Schema({
	"name": String,
	"img": String,
	"rating": Number,
	"time": String,
	"shortDes": String,
	"trending": Boolean,
	"ingredients": [IngredientSchema],
	"steps": [StepSchema]
});

exports.Recipe = Mongoose.model('Recipe', RecipeSchema);