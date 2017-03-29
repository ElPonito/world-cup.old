import { GET } from '../request'
import { api_url } from '../../config/config'

export default class StravaRepository {
    static getToken(code) {
        return GET(`${api_url}/token_exchange/${code}`)
    }
}