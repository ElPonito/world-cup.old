class Race {
    constructor(rawData) {
        this._id = rawData._id
        this.raceName = rawData.raceName
        this.raceDate = rawData.raceDate
        this.raceOwner = rawData.raceOwner
        this.raceAthletes = rawData.raceAthletes
        this.raceSegments = rawData.raceSegments
    }
}

module.exports = Race
