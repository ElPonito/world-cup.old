const GenericDbDao = require('./GenericDbDao')
const notificationTypes = require('../../enum/notificationTypes')

class NotificationDao extends GenericDbDao {
    constructor(athleteDao) {
        super('notifications')
        this.athleteDao = athleteDao
        this.acceptMethods = {
            addFriend: (notification) => {
                this.athleteDao.addFriends(notification)
                this.markAsTreated(notification)
            }
        }
    }

    async getForAthlete(athleteId) {
        const notifications = await this._accessCollection().find({ to: Number(athleteId) }).toArray()
        let enrichedNotifications = []
        const promiseArray = notifications.map(async (notification) => {
            const fromAthlete = await this.athleteDao.getAthlete(notification.from)
            const enrichNotification = Object.assign({}, notification, { from: fromAthlete })
            enrichedNotifications = [...enrichedNotifications, enrichNotification]
            return fromAthlete
        })

        return Promise.all(promiseArray).then(() => enrichedNotifications)
    }

    async acceptNotification(id) {
        const notification = await this.get(id)
        return this.acceptMethods[notification.type](notification)
    }

    async markAsTreated({ _id }) {
        await this._accessCollection().updateOne({ _id }, { $set: { state: 'treated' } })
    }

    createAddFriendNotification(from, to) {
        return this.add({ type: notificationTypes.addFriend, from, to, state: 'new' })
    }
}

module.exports = NotificationDao