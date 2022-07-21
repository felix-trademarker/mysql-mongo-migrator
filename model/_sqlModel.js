
// MYSQL
var mysql = require('mysql');
// var creds = require('./../config/variables')

var con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
});

module.exports = {

    getSQLTables : async function(){
        return new Promise(function(resolve, reject) {
            var sql = `SELECT table_name FROM information_schema.tables
                        WHERE table_schema = '${process.env.DBNAME}';`
            con.query(sql, function (err, result) {
                if (err) reject(err);

                resolve(result)
            });
        });
    },

	getSQL : async function(tableName){
        return new Promise(function(resolve, reject) {
            var sql = `SELECT 
                            *
                        FROM ${tableName}`
            con.query(sql, function (err, result) {
                if (err) reject(err);

                resolve(result)
            });
        });
    },



    
}