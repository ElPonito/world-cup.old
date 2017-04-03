const athleteInitialState = {
    koms: []
}

export default function athleteReducer(state = athleteInitialState, action) {
    switch (action.type) {
        case 'KOMS_FETCHED':
            state = {
                ...state,
                koms: action.data
            }
            break
    }
    return state
}