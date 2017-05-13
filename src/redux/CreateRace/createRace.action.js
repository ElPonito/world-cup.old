import { fetchFriendsList, fetchStarredSegments } from '../Athlete'

export const createRace = token => dispatch => {
    dispatch(fetchFriendsList(token))
    dispatch(fetchStarredSegments(token))
}