import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import loginReducer from './Login/login.reducer'
import athleteReducer from './Athlete/athlete.reducer'

export default combineReducers({
    routing: routerReducer,
    loginReducer,
    athleteReducer
})