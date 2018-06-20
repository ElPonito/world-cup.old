const path = require('path')

const connections = {}

class MongoMultiDatabaseConnection {

    static getDbConnection(mongoClient, dataBaseConnection) {
        const hash = dataBaseConnection

        if (connections[hash]) {
            return Promise.resolve(connections[hash])
        }

        const url = `mongodb://${dataBaseConnection}`

        console.log(`Connexion to ${url} ...`)
        return mongoClient.connect(url).then(db => {
            connections[hash] = db
            return db
        })
    }
}

module.exports = MongoMultiDatabaseConnection
