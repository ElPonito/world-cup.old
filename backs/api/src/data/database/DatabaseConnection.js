const mongodb = require('mongodb')
const MongoMultiDatabaseConnection = require('./MongoMultiDatabaseConnection')
const {databaseConnection} = require('../../config/config')

class DatabaseConnection {

    static getDbConnection() {
        return MongoMultiDatabaseConnection.getDbConnection(mongodb.MongoClient, databaseConnection)
    }
}

module.exports = DatabaseConnection;
