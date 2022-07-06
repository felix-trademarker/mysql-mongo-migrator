const MongoClient = require( 'mongodb' ).MongoClient;
const mongoose = require('mongoose');
const _variables = require( './creds' );

var _db;
console.log(_variables.mongoURL);
module.exports = {

  connectToServer: function( callback, creds ) {
    MongoClient.connect( _variables.mongo.conString ,  _variables.mongoOptions, function( err, client ) {
      _db  = client.db(_variables.mongo.name);
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  },


};