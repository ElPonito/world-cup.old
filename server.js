const express = require('express')

const app = express()

app.use('/', express.static('dist'))
app.use('/login', express.static('dist'))
app.use('/timeline', express.static('dist'))
app.use('/athlete', express.static('dist'))
app.use('/create-race', express.static('dist'))

app.use((req, res) => {
    res.status(404).send('Page Introuvable!')
})

app.listen(3333)
