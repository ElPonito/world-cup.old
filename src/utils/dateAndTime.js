export const secondsToHms = (timeInSeconds) => {
    const time = Number(timeInSeconds)

    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time % 3600 / 60)
    const seconds = Math.floor(time % 3600 % 60)

    return ((hours > 0 ? hours + ":" + (minutes < 10 ? "0" : "") : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds)
}