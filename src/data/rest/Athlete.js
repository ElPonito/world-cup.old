import { GET } from '../request/Request'
import { api_url } from '../../config/config'

export const fetchKoms = (athleteId) => {
    return GET(`${api_url}/athlete-koms/${athleteId}`).then(koms => JSON.parse(koms))
}

export const fetchFriendsList = (token) => {
    return GET(`${api_url}/friends-list/${token}`).then(friends => JSON.parse(friends))
}

export const fetchStarredSegments = token => {
    return GET(`${api_url}/athlete-starred-segment/${token}`).then(segments => JSON.parse(segments))
}

export default {fetchKoms, fetchFriendsList, fetchStarredSegments}