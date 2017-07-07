const strava = require('strava-v3')
const RaceDataProcessor = require('./data/dataProcessors/RaceDataProcessor')

module.exports = {
    createWorldCupApiRoutes: (app, raceDataProcessor, webhookEventsDataProcessor, sessionDao) => {
        app.get('/token_exchange/:access_code', (req, res) => {
            strava.oauth.getToken(req.params.access_code, (err, payload) => {
                const accessToken = payload.access_token
                const athlete = payload.athlete
                res.send({accessToken, athlete})
            })
        }).get('/friends-list/:token', (req, res) => {
            strava.athlete.listFriends({'access_token': req.params.token}, (err, payload) => {
                const friendsList = JSON.stringify(payload)
                res.send(friendsList);
            })
        }).get('/athlete-koms/:athleteId', (req, res) => {
            strava.athletes.listKoms({id: req.params.athleteId}, (err, payload) => {
                const komsList = JSON.stringify(payload)
                res.send(komsList)
            })
        }).get('/athlete-starred-segment/:token', (req, res) => {
            strava.segments.listStarred({'access_token': req.params.token}, (err, payload) => {
                const starredSegments = JSON.stringify(payload)
                res.send(starredSegments)
            })
        }).post('/race', (req, res) => {
            raceDataProcessor.createRace(req.body, webhookEventsDataProcessor).then(() => {
                res.sendStatus(200)
            })
        }).post('/store-token', (req, res) => {
                const token = req.get('Authorization')
                const athleteId = req.body.athleteId
                //@formatter:off
                sessionDao.getAthleteSession(athleteId)
                          .then(session => session && sessionDao.updateSession(session.athleteId, token) || sessionDao.add({athleteId, token}))
                          .then(() => res.sendStatus(200))
                          .catch(err => res.sendStatus(500))
                //@formatter:on
            }
        ).get('/webhook-callback', (req, res) => {
            res.send({'hub.challenge': req.query['hub.challenge']})
        }).post('/webhook-callback', (req, res) => {
            webhookEventsDataProcessor.processEvent(req.body)
            res.sendStatus(200)
        })
    }
}