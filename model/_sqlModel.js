
// MYSQL
var mysql = require('mysql');
var creds = require('./../config/creds')

var con = mysql.createConnection({
  host: creds.mySql.host,
  user: creds.mySql.user,
  password: creds.mySql.pass,
  database: creds.mySql.name,
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