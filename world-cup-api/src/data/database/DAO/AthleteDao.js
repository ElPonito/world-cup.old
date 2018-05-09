const GenericDbDao = require('./GenericDbDao')

class AthleteDao extends GenericDbDao {
    constructor() {
        super('athletes')
        this.addFriends = this.addFriends.bind(this)
    }

    getAthlete(id) {
        return this._accessCollection().findOne({ id })
    }

    search(value) {
        return this._accessCollection().find(
            {
                $or: [
                    { 'firstname': { '$regex': value, '$options': 'i' } },
                    { 'lastname': { '$regex': value, '$options': 'i' } }
                ]
            }
        ).toArray()
    }

    addSendedFriendRequest(from, to) {
        return this._accessCollection().updateOne({ id: from }, { $push: { friendRequestsSended: to } })
    }

    async addFriends({ from, to }) {
        this._accessCollection().updateOne({ id: from }, {
            $pull: { friendRequestsSended: to },
            $push: { friends: to }
        })
        this._accessCollection().updateOne({ id: to }, { $push: { friends: from } })
    }

    async getFriends(athleteId) {
        const athlete = await this.getAthlete(Number(athleteId))
        let friendList = []
        const promiseArray = athlete.friends.map(async (friendId) => {
            const friend = await this.getAthlete(friendId)
            friendList = [...friendList, friend]
            return friend
        })
        return Promise.all(promiseArray).then(() => friendList)
    }
}

module.exports = AthleteDao