import { compose, applyMiddleware, combineReducers, createStore } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import counterReducer from './Counter/counter.reducer'
import loginReducer from './Login/login.reducer'
import athleteReducer from './Athlete/athlete.reducer'

const rootReducer = combineReducers({
    counterReducer,
    loginReducer,
    athleteReducer,
    routing: routerReducer
})

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
)

export default store