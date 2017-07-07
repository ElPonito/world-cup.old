class WebhookEventsModel {
    constructor(rawData) {
        this.athleteId = rawData.athleteId
        this.webhookEventId = rawData.id
    }
}

module.exports = WebhookEventsModel