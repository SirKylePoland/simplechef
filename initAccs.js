/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'simplechef';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var account_json = require('./accounts.json');

// Step 2: Remove all existing document

models.User
  .find()
  .remove()
  .exec(userClear);


function userClear(err) {
  if(err) console.log(err);

  var to_save_count = account_json.length;

  for(var i=0; i<account_json.length; i++) {
    var json = account_json[i];

    var proj = new models.User(json);

    proj.save(function(err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        mongoose.connection.close();
      }
    });
  }
}