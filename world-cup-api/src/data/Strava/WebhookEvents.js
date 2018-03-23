const request = require('request-promise')
const config = require('../../config/config')
let stravaConfig = { client_id: 'fake', client_secret: 'fake' }
try {
    stravaConfig = require('../../config/stravaConfig')
} catch (e) {
    console.warn('Couldn\'t load stravaConfig')
}

const subscribe = token => {
    const options = {
        method: 'POST',
        uri: `https://api.strava.com/api/v3/push_subscriptions?client_id=${stravaConfig.client_id}&client_secret=${stravaConfig.client_secret}&object_type=activity&aspect_type=create&callback_url=${config.webhookCallbackUrl}&verify_token=${token}`
    }

    return request(options)
}

// const unsubscribeFromWebhook = id => DELETE(`https://api.strava.com/api/v3/push_subscriptions/${id}?client_id=${stravaConfig.client_id}&client_secret=${stravaConfig.client_secret}`)

module.exports = {
    subscribe/*,
     unsubscribeFromWebhook*/
}