const express = require('express')

const app = express()

app.use('/', express.static('build'))

app.use((req, res) => {
    res.status(404).send('Page Introuvable!')
})

app.listen(3333)
