import { POST } from '../request/Request'
import { api_url } from '../../config/config'

export const save = data => POST(`${api_url}/race`, JSON.stringify(data))
