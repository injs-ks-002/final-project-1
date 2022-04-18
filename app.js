const express = require('express')
const app = express()
<<<<<<< HEAD
const port = 4000;
const usersRoute = require('./routes/user')


app.use(express.json())
app.use('/api/v1', usersRoute)


app.listen(port, function () {
    console.log('Contoh server berjalan di port 4000!')
})
=======
const port = process.env.PORT || 3000
const router = require('./routes/app.route')

appInit(app)

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})

function appInit(app) {
    app.use(express.json())
    app.use('/', router)
}
>>>>>>> b12a60f0ee577b2b617c118fd93c9a511d80ceb4
