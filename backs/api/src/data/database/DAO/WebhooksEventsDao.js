const GenericDbDao = require('./GenericDbDao')

class WebhooksEventsDao extends GenericDbDao {
    constructor() {
        super('webhooksEvents')
    }
}

module.exports = WebhooksEventsDao