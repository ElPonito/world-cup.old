import React from 'react'
import queryString from 'query-string'
// import { browserHistory } from 'react-router'
import Strava from '../../data/rest/Strava'

const Login = (props) => {

    const { code } = queryString.parse(props.location.search)
    if(!code) {
        props.history.push('/')
    }
    Strava.getToken(code).then(payload => {
        const token = payload.accessToken
        const athlete = payload.athlete
        props.storeToken(token, athlete)
        props.storeTokenInDb(token, athlete)
        props.history.push('timeline')
    })

    return (
        <div>
            Loading Data...
        </div>
    )
}

export default Login