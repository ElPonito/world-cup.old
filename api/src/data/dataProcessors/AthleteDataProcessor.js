class AthleteDataProcessor {
    constructor(athleteDao, notificationDao) {
        this.athleteDao = athleteDao
        this.notificationDao = notificationDao
    }

    addFriend({ from, to }) {
        //TODO add error management
        this.notificationDao.createAddFriendNotification(from, to)
        this.athleteDao.addSendedFriendRequest(from, to)
    }
}

module.exports = AthleteDataProcessor