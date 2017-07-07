import { POST } from '../request/Request'
import config from '../../config'

export const save = data => POST(`${config.api_url}/race`, JSON.stringify(data))
