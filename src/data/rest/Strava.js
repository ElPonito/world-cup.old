import { GET } from '../request'
import config from '../../config'

export default class Strava {
    static getToken(code) {
        return GET(`${config.api_url}/token_exchange/${code}`).then(payload => JSON.parse(payload))
    }

    static getKoms(athleteId) {
        return GET(`${config.api_url}/athlete-koms/${athleteId}`).then(payload => JSON.parse(payload))
    }
}