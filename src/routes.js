import { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './redux/store'
import App from './components/App'
import Counter from './components/Counter'
import NotFound from './components/NotFound'
import HelloWorld from './components/HelloWorld'
import TimeLine from './components/TimeLine'
import Login from './components/Login'

export default class Routes extends Component {
    constructor() {
        super()
    }

    render() {
        // Create an enhanced history that syncs navigation events with the store
        const history = syncHistoryWithStore(browserHistory, store)
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute component={Counter}/>
                    <Route path="login" component={Login}/>
                    <Route path="timeline" component={TimeLine}/>
                    <Route path="hello-world" component={HelloWorld}/>
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        )
    }
}

