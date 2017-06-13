import { compose, applyMiddleware, combineReducers, createStore } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import loginReducer from './Login/login.reducer'
import athleteReducer from './Athlete/athlete.reducer'

const rootReducer = combineReducers({
    loginReducer,
    athleteReducer,
    routing: routerReducer
})

const store = createStore(
    rootReducer,
    !window.__REDUX_DEVTOOLS_EXTENSION__ && compose(applyMiddleware(thunkMiddleware)) || compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__()),
)

export default store