const _ = require('lodash')
const DateManipulation = require('./Util/DateManipulation')
const WebhooksEventsModel = require('../entities/WebhookEventsModel')
const StravaApiRequests = require('../Strava/ApiRequests')

class WebhookEventsProcessor {
    constructor(webhookEventsDao, raceDataProcessor, sessionDao) {
        this.webhookEventsDao = webhookEventsDao
        this.raceDataProcessor = raceDataProcessor
        this.sessionDao = sessionDao
    }

    registerSubscription(rawData) {
        return this.webhookEventsDao.add(new WebhooksEventsModel(rawData))
    }

    processEvent(event) {
        const athleteId = event.owner_id
        const date = DateManipulation.createUTCMidnightISODatefromTimestamp(event.event_time * 1000)
        return this.raceDataProcessor.getByAthleteIdAndDate(athleteId, date).then(races => {
            const callback = activity => {
                const promises = races.map(race =>
                    race.raceSegments.map(segmentId => {
                        if (race.results && race.results[athleteId] && race.results[athleteId][segmentId]) {
                            return
                        }
                        const segmentEffort = _.find(activity['segment_efforts'], {segment: {id: segmentId}})
                        return segmentEffort && this.raceDataProcessor.saveResult(race._id, athleteId, segmentEffort)
                    })
                )
                // TODO catch result when an error occurs
                return Promise.all(promises)
            }
            this.sessionDao.getAthleteSession(athleteId).then(session => {
                const token = session.token
                StravaApiRequests.getActiviy(event.object_id, token, callback)
            })
        })
    }
}

module.exports = WebhookEventsProcessor