const strava = require('strava-v3')

class ApiRequests {
    static getActiviy(id, token, callback) {
        const params = {
            'access_token': token,
            id,
            include_all_efforts: true
        }
        strava.activities.get(params, (err, payload) => callback(payload))
    }
}

module.exports = ApiRequests