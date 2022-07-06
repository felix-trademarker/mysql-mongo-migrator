
    module.exports = { 
  
      mongoOptions    : { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      },
      mongo : {
        conString : 'mongodb://localhost:27017/istudio10',
        name : 'istudio10',
      },
      mySql : {
        name : 'istudio',
        user : 'felixdba',
        pass : 'bigfoot8484!',
        host : 'tmsql01.cnobnjjh1a2c.us-west-1.rds.amazonaws.com',
      }
  
    };
    