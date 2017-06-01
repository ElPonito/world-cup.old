import { save } from '../../data/rest/Race'
import { fetchFriendsList, fetchStarredSegments } from '../Athlete'

export const fetchCreateRaceData = token => dispatch => {
    dispatch(fetchFriendsList(token))
    dispatch(fetchStarredSegments(token))
}

export const createRace = data => () => {
    save(data)
}