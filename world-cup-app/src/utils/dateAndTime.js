export const secondsToHms = (timeInSeconds) => {
    const time = Number(timeInSeconds)

    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time % 3600 / 60)
    const seconds = Math.floor(time % 3600 % 60)

    return ((hours > 0 ? hours + ":" + (minutes < 10 ? "0" : "") : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds)
}

export const createStringDateFromDateObject = dateToConvert => {
    const date = new Date(dateToConvert)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day
    const stringDate = `${year}-${month}-${day}`
    return stringDate
}