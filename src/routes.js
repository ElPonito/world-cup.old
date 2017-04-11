import { Component, PropTypes } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './redux/store'
import requireAuthentication from './components/Athenticated'
import App from './components/App'
import Counter from './components/Counter'
import NotFound from './components/NotFound'
import TimeLine from './components/TimeLine'
import Login from './components/Login'
import Athlete from './components/Athlete'
import CreateRace from './components/CreateRace'

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
                    <Route path="athlete" component={requireAuthentication(Athlete)}/>
                    <Route path="timeline" component={requireAuthentication(TimeLine)}/>
                    <Route path="create-race" component={requireAuthentication(CreateRace)}/>
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        )
    }
}

