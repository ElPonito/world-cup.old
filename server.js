const express = require('express')

const app = express()

app.use('/', express.static('dist'))
app.use('/login', express.static('dist'))

app.use((req, res) => {
    res.status(404).send('Page Introuvable!')
})

app.listen(3333)
