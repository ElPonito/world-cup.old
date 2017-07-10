import { browserHistory } from 'react-router'
import Strava from '../../data/rest/Strava'

const Login = (props) => {

    if (!props.location.query.code) {
        browserHistory.push('/')
    }
    Strava.getToken(props.location.query.code).then(payload => {
        const token = payload.accessToken
        const athlete = payload.athlete
        props.storeToken(token, athlete)
        props.storeTokenInDb(token, athlete.id)
        browserHistory.push('timeline')
    })

    return (
        <div>
            Loading Data...
        </div>
    )
}

export default Login