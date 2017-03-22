import { combineReducers, createStore } from 'redux'
import { routerReducer } from 'react-router-redux'
import counterReducer from './Counter/counter.reducer'

const rootReducer = combineReducers({
    counterReducer: counterReducer,
    routing: routerReducer
})

const store = createStore(rootReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store