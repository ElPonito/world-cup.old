import { GET, POST } from '../request/Request'
import config from '../../app-config'

export const fetchKoms = (athleteId) => {
    return GET(`${config.api_url}/athlete-koms/${athleteId}`).then(koms => JSON.parse(koms))
}

export const fetchFriendsList = (athleteId) => {
    return GET(`${config.api_url}/friends-list/${athleteId}`).then(friends => {
        console.log(friends)
        return JSON.parse(friends)
    })
}

export const searchAthletes = (value) => {
    return GET(`${config.api_url}/athletes-search/${value}`).then(athletes => JSON.parse(athletes))
}

export const getNotifications = athleteId => {
    return GET(`${config.api_url}/notifications/${athleteId}`)
}

export const addFriend = (from, to) => POST(`${config.api_url}/add-friend`, JSON.stringify({ from, to }))

export const fetchStarredSegments = token => {
    return GET(`${config.api_url}/athlete-starred-segment/${token}`).then(segments => JSON.parse(segments))
}

export const storeToken = (token, athlete) => {
    const header = { Authorization: token }
    const body = JSON.stringify({ athlete })
    return POST(`${config.api_url}/store-token`, body, header)
}

export default { fetchKoms, fetchFriendsList, fetchStarredSegments, storeToken }