class DateManipulation {
    static createUTCMidnightISODate(dateToConvert) {
        const date = new Date(dateToConvert)
        const year = date.getFullYear()
        let month = date.getMonth()
        month = month < 10 ? `0${month}` : month
        let day = date.getDate()
        day = day < 10 ? `0${day}` : day
        const stringDate = `${year}-${month}-${day}`
        return new Date(stringDate).toISOString()
    }

    static createUTCMidnightISODatefromTimestamp(timestamp) {
        return new Date(new Date(timestamp).setUTCHours(0, 0, 0, 0)).toISOString()
    }
}

module.exports = DateManipulation