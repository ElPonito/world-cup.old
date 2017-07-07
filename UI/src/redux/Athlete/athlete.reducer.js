const athleteInitialState = {
    koms: [],
    friends: [],
    starredSegments: []
}

export default function athleteReducer(state = athleteInitialState, action) {
    switch (action.type) {
        case 'KOMS_FETCHED':
            state = {
                ...state,
                koms: action.data
            }
            break
        case 'FRIENDS_FETCHED':
            state = {
                ...state,
                friends: action.data
            }
            break
        case 'STARRED_SEGMENTS_FETCHED':
            state = {
                ...state,
                starredSegments: action.data
            }
    }
    return state
}