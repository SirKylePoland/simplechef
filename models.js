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
	"overview": String,
	"trending": Boolean,
	"ingredients": [IngredientSchema],
	"steps": [StepSchema]
});

var UserSchema = new Mongoose.Schema({
	"username": String,
	"password": String,
	"recipes" : [String]
});

UserSchema.methods.validPassword = function(password) {
	return password === this.password;
};

exports.Recipe = Mongoose.model('Recipe', RecipeSchema);
exports.User = Mongoose.model('User', UserSchema);