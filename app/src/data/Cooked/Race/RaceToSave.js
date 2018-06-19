export default class RaceToSave {
    constructor(formData) {
        this.name = formData.name
        this.date = formData.date
        this.owner = formData.owner
        this.athletes = formData.athletes
        this.segments = formData.segments.map(segment => segment.id)
        this.isPrivate = formData.isPrivate
    }
}