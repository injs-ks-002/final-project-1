const db = require('../config/db')

const executeUsers = async (query) => {
    try {
        await db.connect()
        await db.query(query)
        return true
    } catch (error) {
        console.error(error.stack)
        return false
    }
}

const queryTextUsers = `CREATE TABLE IF NOT EXISTS "users" (
    "id" BIGSERIAL,
    "email" VARCHAR UNIQUE,
    "password" VARCHAR,
    PRIMARY KEY ("id")
);`

executeUsers(queryTextUsers).then(result => {
    if (result) {
        console.log('User table created')
        process.exit()
    }
})

module.exports = {
    executeUsers, queryTextUsers
}