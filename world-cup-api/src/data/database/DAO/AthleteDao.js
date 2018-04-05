const GenericDbDao = require('./GenericDbDao')

class AthleteDao extends GenericDbDao {
    constructor() {
        super('athletes')
    }

    getAthlete(id) {
        return this._accessCollection().findOne({ id })
    }
}

module.exports = AthleteDao