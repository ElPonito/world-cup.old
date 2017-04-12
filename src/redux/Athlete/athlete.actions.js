import Athlete from '../../data/entities/Athlete'

export const fetchKoms = (athleteId) => dispatch => {
    Athlete.fetchKoms(athleteId).then((koms) => {
        dispatch(komsFetched(koms))
    })
}

export const fetchFriendsList = (token) => dispatch => {
    Athlete.fetchFriendsList(token).then(friends => {
        dispatch(friendsFetched(friends))
    })
}

export const komsFetched = (koms) => ({
    type: 'KOMS_FETCHED',
    data: koms
})

export const friendsFetched = (friends) => ({
    type: 'FRIENDS_FETCHED',
    data: friends
})