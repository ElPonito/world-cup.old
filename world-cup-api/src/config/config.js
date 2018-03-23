let credentials = { prodCredentials: 'fake', devCredentials: 'fake' }
try {
    credentials = require('./credentials')
} catch (e) {
    console.warn('Couldn\'t load stravaConfig')
}

const { prodCredentials, devCredentials } = credentials

const config = {
    local: {
        databaseConnection: 'localhost:27017/WorldCup'
    },
    dev: {
        databaseConnection: `${devCredentials}@worldcup-dev-shard-00-00-dqlhb.mongodb.net:27017,worldcup-dev-shard-00-01-dqlhb.mongodb.net:27017,worldcup-dev-shard-00-02-dqlhb.mongodb.net:27017/WorldCup?ssl=true&replicaSet=WorldCup-dev-shard-0&authSource=admin`,
        webhookCallbackUrl: 'http://dev-api.worldcup.guericed.com/webhook-callback'
    },
    production: {
        databaseConnection: `${prodCredentials}@worldcup-cluster-shard-00-00-zpe7x.mongodb.net:27017,worldcup-cluster-shard-00-01-zpe7x.mongodb.net:27017,worldcup-cluster-shard-00-02-zpe7x.mongodb.net:27017/WorldCup?ssl=true&replicaSet=WorldCup-Cluster-shard-0&authSource=admin`,
        webhookCallbackUrl: 'http://api.worldcup.guericed.com/webhook-callback'
    }
}

module.exports = config[process.env.NODE_ENV]