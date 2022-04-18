const express = require('express')
const app = express()
const port = 4000;
const usersRoute = require('./routes/user')


app.use(express.json())
app.use('/api/v1', usersRoute)


app.listen(port, function () {
    console.log('Contoh server berjalan di port 4000!')
})
