const Race = require('../entities/RaceModel')
const webhookEvents = require('../Strava/WebhookEvents')
const _ = require('lodash')

class RaceDataProcessor {
    constructor(raceDao) {
        this.raceDao = raceDao
    }

    createRace(rawData, webhookEventsDataProcessor) {
        const date = new Date(rawData.date).toISOString()
        const newRawData = _.assign({}, rawData, { date })
        // TODO uncomment code!!! this just for local tests
        return this.raceDao.add(new Race(newRawData))
        /*return webhookEvents.subscribe(newRawData.token)
            .then(res => webhookEventsDataProcessor.registerSubscription(_.assign({}, JSON.parse(res), { athleteId: newRawData.owner })))
            .then(() => this.raceDao.add(new Race(newRawData)))
            .catch(console.log)*/
    }

    async computeRaceResult(raceId) {
        try {
            const race = await this.raceDao.get(raceId)
            const raceRanking = Object.entries(race.results).map(([athleteId, results]) => {
                const raceResultsArray = Object.entries(results)
                const athleteTotalRaceTime = raceResultsArray.reduce((res, [segmentId, time]) => res + time, 0)
                return { athleteId, athleteTotalRaceTime, segmentsNumber: raceResultsArray.length }
            })
            const raceRankingSorted = raceRanking.sort(rankTwoResults)
            const raceRankingToSave = raceRankingSorted.reduce((result, value, index) => {
                return Object.assign(result, { [index + 1]: Number(value.athleteId) })
            }, {})
            this.raceDao.updateRanking(raceId, raceRankingToSave)
        } catch (e) {
            console.error('Error on RaceDataProcessor.computeRaceResult:', e)
        }
    }

    getByAthleteIdAndDate(athleteId, date) {
        return this.raceDao.getByAthleteIdAndDate(athleteId, date)
    }

    saveResult(raceId, athleteId, segmentEffort) {
        return this.raceDao.saveResult(raceId, athleteId, segmentEffort).then(() => {this.computeRaceResult(raceId)})
    }
}

const rankTwoResults = (result1, result2) => {
    return result1.segmentsNumber === result2.segmentsNumber ? result1.athleteTotalRaceTime - result2.athleteTotalRaceTime : result2.segmentsNumber - result1.segmentsNumber
}

module.exports = RaceDataProcessor