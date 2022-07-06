// CALL ENV FILE
require('dotenv').config()

console.log("App Running... ");

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let dbconfig = {}

let mConfig = {}


var fs = require('fs');

if (fs.existsSync('./config/creds.js')) {

  mainFunc()

} else {

  rl.question('MYSQL NAME? ', function (dbname) {
    rl.question('MYSQL USERNAME?', function (dbuser) {
      rl.question('MYSQL PASSWORD?', function (dbpass) {
        rl.question('MYSQL HOST?', function (dbhost) {
          
          // save
          // save creds
          dbconfig.name = dbname;
          dbconfig.user = dbuser;
          dbconfig.pass = dbpass;
          dbconfig.host = dbhost;
  
          rl.question('MONGO NAME? ', function (dbname) {
            rl.question('MONGO CONNECTION STRING?', function (conString) {
              mConfig.name = dbname;
              mConfig.conString = conString
          
              rl.close();
            });
          });
  
          // rl.close();
        });
      });
    });
  });
  
  rl.on('close', function () {
    console.log('\nGREAT!!!\nMigration Starting...');

    // writeFile function with filename, content and callback function
    var jsScriptString = `
    module.exports = { 
  
      mongoOptions    : { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      },
      mongo : {
        conString : '${mConfig.conString}',
        name : '${mConfig.name}',
      },
      mySql : {
        name : '${dbconfig.name}',
        user : '${dbconfig.user}',
        pass : '${dbconfig.pass}',
        host : '${dbconfig.host}',
      }
  
    };
    `
    fs.writeFile('./config/creds.js', jsScriptString, function (err) {
      if (err) throw err;
      console.log('File is created successfully.');
  
      mainFunc()
  
    });
  
  });
} // CLOSE IF ELSE

function mainFunc(){

  let conn = require('./config/DbConnect');
  conn.connectToServer( function( err, client ) {

    if (err) console.log(err)

    // SERVICE
    var services = require('./services/migrationService')

    services.process()

    console.log("access");
  })

}
