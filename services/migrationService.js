var Model = require('./../model/_model')
let rpoSQL = require('./../model/_sqlModel')

exports.process = async function(req, res, next) {
    
    let tables = await rpoSQL.getSQLTables()

    for (let i=0; i < tables.length; i++) {

        console.log("Migrating >>>", tables[i].table_name)
        let defaultModel = new Model(tables[i].table_name)

        let hastableContentMongo = await defaultModel.getLatest()

        if (!(hastableContentMongo && hastableContentMongo.length > 0)) {

            let dataArr = await rpoSQL.getSQL(tables[i].table_name)
            console.log("Total fetched records", dataArr.length)

            for (let n=0; n < dataArr.length; n++) {
                let el = dataArr[n]
                await defaultModel.put(el)
                console.log(tables[i].table_name,">> Added ",n +' of '+dataArr.length);
            }
        } else {
            console.log("Skip >>>", tables[i].table_name)
        }

        

    }
}