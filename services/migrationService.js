var Model = require('./../model/_model')
let rpoSQL = require('./../model/_sqlModel')

exports.process = async function(req, res, next) {
    
    let tables = await rpoSQL.getSQLTables()

    console.log("found tables: ", tables)
    for (let i=0; i < tables.length; i++) {

        let tableName = tables[i].table_name ? tables[i].table_name : tables[i].TABLE_NAME

        console.log("Migrating >>>", tableName)
        let defaultModel = new Model(tableName)

        let hastableContentMongo = await defaultModel.getLatest()

        if (!(hastableContentMongo && hastableContentMongo.length > 0)) {

            let dataArr = await rpoSQL.getSQL(tableName)
            console.log("Total fetched records", dataArr.length)

            for (let n=0; n < dataArr.length; n++) {
                let el = dataArr[n]
                await defaultModel.put(el)
                console.log(tableName,">> Added ",n +' of '+dataArr.length);
            }
        } else {
            console.log("Skip >>>", tableName)
        }

        

    }
}