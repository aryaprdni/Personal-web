const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/about', (req, res) => {
    res.send('Hello my name is Arya!')
})

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`)
})