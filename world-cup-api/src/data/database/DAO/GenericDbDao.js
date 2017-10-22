const sanitize = require('mongo-sanitize')
const _ = require('lodash')

class GenericDbDao {

    constructor(collectionName) {
        this._collectionName = collectionName
    }

    set dbConnection(value) {
        this._dbConnection = value
    }

    _accessCollection() {
        return this._dbConnection.collection(this._collectionName)
    }

    add(item) {
        return this._accessCollection().insertOne(item)
    }

    get(id) {
        const cleanId = sanitize(id)

        return this._accessCollection().findOne({id: cleanId}).then(item => {
            if (!item) {
                throw new Error(`Item not found in collection ${this._collectionName} with ID ${cleanId}`)
            }

            return item
        })
    }

    getAll() {
        return this._accessCollection().find().toArray()
    }

    update(id, documentUpdate) {
        if (_.isEmpty(documentUpdate)) {
            return Promise.resolve()
        }

        return this._accessCollection().updateOne({id: sanitize(id)}, {$set: documentUpdate})
    }

}

module.exports = GenericDbDao
