import { save } from '../../data/rest/Race'
import { fetchFriendsList, fetchStarredSegments } from '../Athlete'
import RaceToSave from '../../data/Cooked/Race/RaceToSave'

export const fetchCreateRaceData = token => dispatch => {
    dispatch(fetchFriendsList(token))
    dispatch(fetchStarredSegments(token))
}

export const createRace = raceData => () => {
    save(new RaceToSave(raceData))
}