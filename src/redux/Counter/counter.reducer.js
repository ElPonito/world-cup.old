const counterInitialState = {
    counterValue: 0
}

export default function counterReducer(state = counterInitialState, action) {
    switch (action.type) {
        case 'TEST':
            state = {
                ...state,
                test: 'ok'
            }
            break
        case 'ADD_ONE':
            state = {
                ...state,
                counterValue: state.counterValue + 1
            }
            break
        case 'REMOVE_ONE':
            state = {
                ...state,
                counterValue: state.counterValue - 1
            }
            break
    }
    return state
}