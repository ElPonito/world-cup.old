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
            const segments = {
                'segments': [{
                    'id': 773949,
                    'name': '4 seigneurs',
                    'climb_category': 3,
                    'climb_category_desc': '2',
                    'avg_grade': 6.85334,
                    'start_latlng': [45.17791570164263, 5.7821782026439905],
                    'end_latlng': [45.154730435460806, 5.792409824207425],
                    'elev_difference': 561.2,
                    'distance': 8188.71
                }, {
                    'id': 4463694,
                    'name': 'Pont du Vercors - Pont du Drac ',
                    'climb_category': 0,
                    'climb_category_desc': 'NC',
                    'avg_grade': -0.174224,
                    'start_latlng': [45.19262, 5.700633],
                    'end_latlng': [45.207656, 5.684076],
                    'elev_difference': 8.199999999999989,
                    'distance': 2181.1
                }, {
                    'id': 8308945,
                    'name': 'Pont du Drac-Sortie Sassenage',
                    'climb_category': 0,
                    'climb_category_desc': 'NC',
                    'avg_grade': -0.22187,
                    'start_latlng': [45.207796, 5.683454],
                    'end_latlng': [45.215906, 5.672321],
                    'elev_difference': 3.4000000000000057,
                    'distance': 1262.0
                }, {
                    'id': 5310102,
                    'name': 'Cyclist Lane Isère - "Taillées" Dir Chambery - part 03',
                    'climb_category': 0,
                    'climb_category_desc': 'NC',
                    'avg_grade': 0.00652231,
                    'start_latlng': [45.199642, 5.771626],
                    'end_latlng': [45.19115, 5.78152],
                    'elev_difference': 12.400000000000006,
                    'distance': 1533.2
                }, {
                    'id': 2579835,
                    'name': 'Digue Pont de Catane/Pont D531 ',
                    'climb_category': 0,
                    'climb_category_desc': 'NC',
                    'avg_grade': -0.346648,
                    'start_latlng': [45.179094951599836, 5.700196651741862],
                    'end_latlng': [45.20775267854333, 5.683830315247178],
                    'elev_difference': 14.199999999999989,
                    'distance': 3692.51
                }, {
                    'id': 4907898,
                    'name': 'Cyclist Lane Isère - "Taillées" Dir Chambery - part 01',
                    'climb_category': 0,
                    'climb_category_desc': 'NC',
                    'avg_grade': -0.533771,
                    'start_latlng': [45.191199, 5.752385],
                    'end_latlng': [45.195423, 5.753945],
                    'elev_difference': 4.0,
                    'distance': 487.1
                }, {
                    'id': 644240,
                    'name': 'La Bastille',
                    'climb_category': 2,
                    'climb_category_desc': '3',
                    'avg_grade': 13.8588,
                    'start_latlng': [45.2053547, 5.737829469],
                    'end_latlng': [45.200917153, 5.725667831],
                    'elev_difference': 259.076,
                    'distance': 1869.4
                }, {
                    'id': 4083033,
                    'name': 'Digue-Rondeau-Catane',
                    'climb_category': 0,
                    'climb_category_desc': 'NC',
                    'avg_grade': -0.362319,
                    'start_latlng': [45.160224, 5.698974],
                    'end_latlng': [45.179997, 5.700201],
                    'elev_difference': 8.599999999999994,
                    'distance': 2208.0
                }, {
                    'id': 2404561,
                    'name': 'St Martin d\'Hères - Gières',
                    'climb_category': 0,
                    'climb_category_desc': 'NC',
                    'avg_grade': 0.211434,
                    'start_latlng': [45.16568375761561, 5.766193060774648],
                    'end_latlng': [45.177194512222535, 5.776439325672687],
                    'elev_difference': 12.350999999999999,
                    'distance': 1609.61
                }, {
                    'id': 780274,
                    'name': 'St Nizier, final depuis la tour sans venin',
                    'climb_category': 3,
                    'climb_category_desc': '2',
                    'avg_grade': 6.53538,
                    'start_latlng': [45.17111303284764, 5.667064329609275],
                    'end_latlng': [45.17236084677279, 5.635654153302312],
                    'elev_difference': 479.80000000000007,
                    'distance': 7341.58
                }]
            }
            /*strava.segments.explore({ bounds: req.query.bounds, activity_type: 'riding', min_cat: 0, max_cat: 5 }, (err, payload) => {
                const segments = JSON.stringify(payload.segments)
                res.send(segments)
            })*/
            res.send(segments.segments)
        }).get('/segment/:id', (req, res) => {
            const { id } = req.params
            strava.segments.get({ id }, (err, payload) => {
                res.send(JSON.stringify(payload))
            })
        })
    }
}