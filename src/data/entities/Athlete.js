import { GET } from '../../data/request/Request'
import { api_url } from '../../config/config'
import { dispatch } from 'redux'

export const fetchKoms = (athleteId) => {
    return GET(`${api_url}/athlete-koms/${athleteId}`).then(koms => JSON.parse(koms))
}

export default {fetchKoms}