const athleteInitialState = {
    koms: [],
    friends: []
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
    }
    return state
}