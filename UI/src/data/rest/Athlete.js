import { GET, POST } from '../request/Request'
import config from '../../config'

export const fetchKoms = (athleteId) => {
    return GET(`${config.api_url}/athlete-koms/${athleteId}`).then(koms => JSON.parse(koms))
}

export const fetchFriendsList = (token) => {
    return GET(`${config.api_url}/friends-list/${token}`).then(friends => JSON.parse(friends))
}

export const fetchStarredSegments = token => {
    return GET(`${config.api_url}/athlete-starred-segment/${token}`).then(segments => JSON.parse(segments))
}

export const storeToken = (token, athleteId) => {
    const header = {Authorization: token}
    const body = JSON.stringify({athleteId})
    return POST(`${config.api_url}/store-token`, body, header)
}

export default {fetchKoms, fetchFriendsList, fetchStarredSegments, storeToken}