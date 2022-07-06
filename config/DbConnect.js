const MongoClient = require( 'mongodb' ).MongoClient;
const mongoose = require('mongoose');
const _variables = require( './variables' );

var _db;
console.log(_variables);
module.exports = {

  // connectToServer: function( callback, creds ) {
  //   MongoClient.connect( _variables.mongo.conString ,  _variables.mongoOptions, function( err, client ) {
      
  //     if (client) _db  = client.db(_variables.mongo.name);

  //     return callback( err );
  //   } );
  // },

  connectToServer: function( callback ) {
    MongoClient.connect( _variables.mongoURL ,  _variables.mongoOptions, function( err, client ) {
      _db  = client.db(_variables.mongoDB);
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  },


};