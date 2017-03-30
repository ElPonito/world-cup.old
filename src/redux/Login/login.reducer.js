const loginInitialState = {
    token: undefined
}

export default function loginReducer(state = loginInitialState, action) {
    switch (action.type) {
        case 'STORE_TOKEN':
            state = {
                ...state,
                token: action.token
            }
            break

    }
    return state
}