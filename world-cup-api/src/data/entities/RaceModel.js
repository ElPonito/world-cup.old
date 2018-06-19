class Race {
    constructor(rawData) {
        this._id = rawData._id
        this.name = rawData.name
        this.date = rawData.date
        this.owner = rawData.owner
        this.athletes = rawData.athletes
        this.segments = rawData.segments
        this.isPrivate = rawData.isPrivate
    }
}

module.exports = Race
