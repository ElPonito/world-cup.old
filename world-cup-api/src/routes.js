const strava = require('strava-v3')

module.exports = {
    createWorldCupApiRoutes: (app, raceDataProcessor, webhookEventsDataProcessor, sessionDao) => {
        app.get('/token_exchange/:access_code', (req, res) => {
            strava.oauth.getToken(req.params.access_code, (err, payload) => {
                const accessToken = payload.access_token
                const athlete = payload.athlete
                res.send({ accessToken, athlete })
            })
        }).get('/friends-list/:token', (req, res) => {
            strava.athlete.listFriends({ 'access_token': req.params.token }, (err, payload) => {
                const friendsList = JSON.stringify(payload)
                res.send(friendsList)
            })
        }).get('/athlete-koms/:athleteId', (req, res) => {
            strava.athletes.listKoms({ id: req.params.athleteId }, (err, payload) => {
                const komsList = JSON.stringify(payload)
                res.send(komsList)
            })
        }).get('/athlete-starred-segment/:token', (req, res) => {
            strava.segments.listStarred({ 'access_token': req.params.token }, (err, payload) => {
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
                    .then(session => session && sessionDao.updateSession(session.athleteId, token) || sessionDao.add({
                        athleteId,
                        token
                    }))
                    .then(() => res.sendStatus(200))
                    .catch(err => res.sendStatus(500))
                //@formatter:on
            }
        ).get('/webhook-callback', (req, res) => {
            res.send({ 'hub.challenge': req.query['hub.challenge'] })
        }).post('/webhook-callback', (req, res) => {
            webhookEventsDataProcessor.processEvent(req.body)
            res.sendStatus(200)
        }).get('/segments', (req, res) => {
            strava.segments.explore({
                bounds: req.query.bounds,
                activity_type: 'riding',
                min_cat: 0,
                max_cat: 5
            }, (err, payload) => {
                const segments = JSON.stringify(payload.segments)
                res.send(segments)
            })
        }).get('/segment/:id', (req, res) => {
            const { id } = req.params
            strava.segments.get({ id }, (err, payload) => {
                res.send(JSON.stringify(payload))
            })
        })
    }
}