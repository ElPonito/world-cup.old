import Athlete from '../../data/rest/Athlete'

export const fetchKoms = athleteId => dispatch => {
    Athlete.fetchKoms(athleteId).then((koms) => {
        dispatch(komsFetched(koms))
    })
}

export const fetchFriendsList = athleteId => dispatch => {
    Athlete.fetchFriendsList(athleteId).then(friends => {
        dispatch(friendsFetched(friends))
    })
}

export const fetchStarredSegments = token => dispatch => {
    Athlete.fetchStarredSegments(token).then(segments => {
        dispatch(starredSementsFetched(segments))
    })
}

export const komsFetched = koms => ({
    type: 'KOMS_FETCHED',
    data: koms
})

export const friendsFetched = friends => ({
    type: 'FRIENDS_FETCHED',
    data: friends
})

export const starredSementsFetched = segments => ({
    type: 'STARRED_SEGMENTS_FETCHED',
    data: segments
})