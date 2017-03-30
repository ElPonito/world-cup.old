import { browserHistory } from 'react-router'
import StravaRepository from '../../data/rest/StravaRepository'

const TimeLine = (props) => {

    if (!props.location.query.code) {
        browserHistory.push('/');
    }
    StravaRepository.getToken(props.location.query.code).then(payload => {
        props.storeToken(payload.access_token, payload.athlete)
        browserHistory.push('timeline')
    })

    return (
        <div>
            Loading Data...
        </div>
    )
}

export default TimeLine