const request = require('request-promise')
const stravaConfig = require('../../config/stravaConfig')
const {webhookCallbackUrl} = require('../../config/config')

const subscribe = token => {
    const options = {
        method: 'POST',
        uri: `https://api.strava.com/api/v3/push_subscriptions?client_id=${stravaConfig.client_id}&client_secret=${stravaConfig.client_secret}&object_type=activity&aspect_type=create&callback_url=${webhookCallbackUrl}&verify_token=${token}`
    }

    return request(options)
}

// const unsubscribeFromWebhook = id => DELETE(`https://api.strava.com/api/v3/push_subscriptions/${id}?client_id=${stravaConfig.client_id}&client_secret=${stravaConfig.client_secret}`)

module.exports = {
    subscribe/*,
     unsubscribeFromWebhook*/
}