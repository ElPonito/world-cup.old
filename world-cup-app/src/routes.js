import { Component } from 'react'
import { browserHistory, Route, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import store from './redux/store'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import App from './components/App'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Athlete from './components/Athlete/Athlete.jsx'

import requireAuthentication from './components/Athenticated'
import TimeLine from './components/TimeLine'
/*import Home from './components/Home'
import CreateRace from './components/CreateRace'*/

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#819ca9',
            main: '#546e7a',
            dark: '#29434e',
        },
        secondary: {
            light: '#f05545',
            main: '#b71c1c',
            dark: 'S — Dark',
        },
    }
})

export default class Routes extends Component {
    constructor() {
        super()
    }

    render() {
        // Create an enhanced history that syncs navigation events with the store
        const history = syncHistoryWithStore(browserHistory, store)
        return (
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                    <Route path='/' component={App}>
                        <Route path='login' component={Login}/>
                        <Route path='athlete' component={requireAuthentication(Athlete)}/>
                        <Route path='timeline' component={requireAuthentication(TimeLine)}/>
                        {/* <IndexRoute component={Home}/>
                        <Route path='create-race' component={requireAuthentication(CreateRace)}/>*/}
                    </Route>
                    <Route path='*' component={NotFound}/>
                </Router>
            </MuiThemeProvider>
        )
    }
}

