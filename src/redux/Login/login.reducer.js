const loginInitialState = {
    token: localStorage.token || null,
    athlete: localStorage.athlete ? JSON.parse(localStorage.athlete) : null,
    isAuthenticated: !!localStorage.isAuthenticated
}

export default function loginReducer(state = loginInitialState, action) {
    switch (action.type) {
        case 'STORE_TOKEN':
            localStorage.token = action.token
            localStorage.isAuthenticated = true
            localStorage.athlete = JSON.stringify(action.athlete)
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