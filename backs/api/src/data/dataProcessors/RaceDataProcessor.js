const Race = require('../entities/RaceModel')
const webhookEvents = require('../Strava/WebhookEvents')
const _ = require('lodash')

class RaceDataProcessor {
    constructor(raceDao) {
        this.raceDao = raceDao
    }

    createRace(rawData, webhookEventsDataProcessor) {
        const raceDate = new Date(rawData.raceDate).toISOString()
        const newRawData = _.assign({}, rawData, {raceDate})
        return webhookEvents.subscribe(newRawData.token)
                            .then(res => webhookEventsDataProcessor.registerSubscription(_.assign({}, JSON.parse(res), {athleteId: newRawData.raceOwner})))
                            .then(() => this.raceDao.add(new Race(newRawData)))
                            .catch(console.log)
    }

    getByAthleteIdAndDate(athleteId, date) {
        return this.raceDao.getByAthleteIdAndDate(athleteId, date)
    }

    saveResult(raceId, athleteId, segmentEffort) {
        this.raceDao.saveResult(raceId, athleteId, segmentEffort)
    }
}

module.exports = RaceDataProcessor