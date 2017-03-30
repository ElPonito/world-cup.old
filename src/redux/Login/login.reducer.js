const loginInitialState = {
    token: null,
    isAuthenticated: false
}

export default function loginReducer(state = loginInitialState, action) {
    switch (action.type) {
        case 'STORE_TOKEN':
            state = {
                ...state,
                token: action.token,
                athlete: action.athlete,
                isAuthenticated: true
            }
            break

    }
    return state
}