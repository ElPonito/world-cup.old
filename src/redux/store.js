import { combineReducers, createStore } from 'redux'
import { routerReducer } from 'react-router-redux'
import counterReducer from './Counter/counter.reducer'
import loginReducer from './Login/login.reducer'

const rootReducer = combineReducers({
    counterReducer: counterReducer,
    loginReducer: loginReducer,
    routing: routerReducer
})

const store = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store