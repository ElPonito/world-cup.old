const GenericDbDao = require('./GenericDbDao')
const Race = require('../../entities/RaceModel')

class RaceDao extends GenericDbDao {
    constructor() {
        super('races')
    }

    getByAthleteIdAndDate(athleteId, raceDate) {
        const filter = {raceAthletes: athleteId, raceDate}
        return this._accessCollection().find(filter).toArray().then(races => races.map(race => new Race(race)))
    }

    saveResult(raceId, athleteId, segmentEffort) {
        const segmentId = segmentEffort.segment.id
        const segmentTime = segmentEffort.moving_time
        const key = `results.${athleteId}.${segmentId}`
        return this._accessCollection()
                   .updateOne({_id: raceId}, {$set: {[key]: segmentTime}})
    }
}

module.exports = RaceDao