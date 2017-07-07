const GenericDbDao = require('./GenericDbDao')

class SessionDao extends GenericDbDao {
    constructor() {
        super('sessions')
    }

    getAthleteSession(athleteId) {
        return this._accessCollection().findOne({athleteId})
    }

    updateSession(athleteId, token) {
        return this._accessCollection().updateOne({athleteId}, {$set: {token}})
    }
}

module.exports = SessionDao