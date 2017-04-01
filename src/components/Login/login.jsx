import { browserHistory } from 'react-router'
import StravaRepository from '../../data/rest/StravaRepository'

const Login = (props) => {

    if (!props.location.query.code) {
        browserHistory.push('/')
    }
    StravaRepository.getToken(props.location.query.code).then(payload => {
        props.storeToken(payload.accessToken, payload.athlete)
        browserHistory.push('timeline')
    })

    return (
        <div>
            Loading Data...
        </div>
    )
}

export default Login