import { POST } from '../request/Request'
import config from '../../app-config'

export const save = data => POST(`${config.api_url}/race`, JSON.stringify(data))
