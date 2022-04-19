const express = require('express')
const app = express()
const port = process.env.PORT | 4000;
const router = require('./routes/app.route')


app.use(express.json())
app.use('/', router)


app.listen(port, function () {
    console.log(`App running on http://localhost:${port}`)
})
