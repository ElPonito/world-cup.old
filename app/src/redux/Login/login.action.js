import Athlete from '../../data/rest/Athlete'

export const storeToken = (token, athlete) => {
    return ({
        type: 'STORE_TOKEN',
        token,
        athlete
    })
}

export const storeTokenInDb = (token, athlete) => dispatch => Athlete.storeToken(token, athlete)