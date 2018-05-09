const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const DatabaseConnection = require('./data/database/DatabaseConnection')
const RaceDao = require('./data/database/DAO/RaceDao')
const WebhookEventsDao = require('./data/database/DAO/WebhooksEventsDao')
const SessionDao = require('./data/database/DAO/SessionDao')
const AthleteDao = require('./data/database/DAO/AthleteDao')
const NotificationDao = require('./data/database/DAO/NotificationDao')
const RaceDataProcessor = require('./data/dataProcessors/RaceDataProcessor')
const WebhookEventsDataProcessor = require('./data/dataProcessors/WebhookEventsDataProcessor')
const AthleteDataProcessor = require('./data/dataProcessors/AthleteDataProcessor')
const routes = require('./routes')

class App {

    constructor() {
        this.athleteDao = new AthleteDao()
        this.raceDao = new RaceDao()
        this.webhookEventsDao = new WebhookEventsDao()
        this.sessionDao = new SessionDao()
        this.notificationDao = new NotificationDao(this.athleteDao)
        this.raceDataProcessor = new RaceDataProcessor(this.raceDao)
        this.webhookEventsDataProcessor = new WebhookEventsDataProcessor(this.webhookEventsDao, this.raceDataProcessor, this.sessionDao)
        this.athleteDataProcessor = new AthleteDataProcessor(this.athleteDao, this.notificationDao)
    }

    initDataBase() {
        return DatabaseConnection.getDbConnection().then(dbConnection => {
            this.athleteDao.dbConnection = dbConnection
            this.raceDao.dbConnection = dbConnection
            this.webhookEventsDao.dbConnection = dbConnection
            this.sessionDao.dbConnection = dbConnection
            this.notificationDao.dbConnection = dbConnection
        })
    }

    start(serverPort) {

        app.all('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
            next()
        })

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({
            extended: true
        }))

        routes.createWorldCupApiRoutes(app, this.raceDataProcessor, this.webhookEventsDataProcessor, this.sessionDao, this.athleteDao, this.athleteDataProcessor, this.notificationDao)

        app.listen(serverPort, () => {
            console.log(`App listening on port ${serverPort}!`)
        })
    }

}

module.exports = App