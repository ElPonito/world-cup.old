export default class RaceToSave {
    constructor(formData) {
        this.raceName = formData.raceName
        this.raceDate = formData.stringDate
        this.raceOwner = formData.raceOwner
        this.raceAthletes = formData.raceAthletes
        this.raceSegments = formData.raceSegments
    }
}