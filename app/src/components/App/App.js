import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider, withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'
import MenuAppBar from './MenuAppBar/MenuAppBar'
import Home from '../Home/Home'
import About from '../About/About'
import Login from '../Login'
import Athlete from '../Athlete/Athlete.jsx'
import Timeline from '../Timeline/Timeline.jsx'

import requireAuthentication from '../Athenticated'
import CreateRace from '../CreateRace/CreateRace.jsx'
import './App.css'

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

const styles = {
    root: {
        flexGrow: 1,
    },
}

class App extends Component {
    render() {
        const { classes } = this.props
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <MenuAppBar/>
                    <main>
                        <Route exact path='/' component={Home}/>
                        <div className='app-container'>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/create-race' component={requireAuthentication(CreateRace)}/>
                            <Route exact path='/timeline' component={requireAuthentication(Timeline)}/>
                            <Route exact path='/athlete' component={requireAuthentication(Athlete)}/>
                            <Route exact path='/about-us' component={About}/>
                        </div>
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(App)
