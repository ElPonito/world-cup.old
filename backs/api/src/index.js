const App = require('./App')
const worldCup = new App()

worldCup.initDataBase().then(() => {
    const serverPort = process.argv[2] ? process.argv[2] : 15000
    worldCup.start(serverPort)
})