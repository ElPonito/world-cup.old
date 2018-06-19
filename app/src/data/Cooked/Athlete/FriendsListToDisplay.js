import Friend from './Friend'

export default class FriendsListToDisplay {
    constructor(rawData) {
        this._list = rawData.map(friend => new Friend(friend))
    }

    listToTableDisplay() {
        return this._list.map(friend => friend.toTableDisplay())
    }
}