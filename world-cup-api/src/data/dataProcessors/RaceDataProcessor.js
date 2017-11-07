const Race = require('../entities/RaceModel')
const webhookEvents = require('../Strava/WebhookEvents')
const _ = require('lodash')

class RaceDataProcessor {
    constructor(raceDao) {
        this.raceDao = raceDao
    }

    createRace(rawData, webhookEventsDataProcessor) {
        const raceDate = new Date(rawData.raceDate).toISOString()
        const newRawData = _.assign({}, rawData, { raceDate })
        return webhookEvents.subscribe(newRawData.token)
            .then(res => webhookEventsDataProcessor.registerSubscription(_.assign({}, JSON.parse(res), { athleteId: newRawData.raceOwner })))
            .then(() => this.raceDao.add(new Race(newRawData)))
            .catch(console.log)
    }

    async computeRaceResult(raceId) {
        const race = await this.raceDao.get(raceId)
        const raceRanking = Object.entries(race.results).map(([athleteId, results]) => {
            const athleteTotalRaceTime = Object.entries(results).reduce((res, [segmentId, time]) => res + time, 0)
            return { athleteId, athleteTotalRaceTime }
        })
        const raceRankingSorted = raceRanking.sort((item1, item2) => item1.athleteTotalRaceTime - item2.athleteTotalRaceTime)
        return raceRankingSorted.reduce((result, value, index) => {
            return Object.assign(result, { [index]: value.athleteId })
        }, {})
    }

    getByAthleteIdAndDate(athleteId, date) {
        return this.raceDao.getByAthleteIdAndDate(athleteId, date)
    }

    saveResult(raceId, athleteId, segmentEffort) {
        return this.raceDao.saveResult(raceId, athleteId, segmentEffort).then(() => {this.computeRaceResult(raceId)})
    }
}

module.exports = RaceDataProcessor