const db = require('../config/db')

const executeReflections = async (query) => {
    try {
        await db.connect()
        await db.query(query)
        return true
    } catch (error) {
        console.error(error.stack)
        return false
    }
}

const queryTextReflections = `CREATE TABLE IF NOT EXISTS "reflections" (
    "id" BIGSERIAL,
    "success" VARCHAR,
    "low_point" VARCHAR,
    "take_away" VARCHAR,
    "owner_id" BIGSERIAL,
    "created_date" TIMESTAMP DEFAULT now(),
    "modified_date" TIMESTAMP DEFAULT now(),
    PRIMARY KEY ("id"),
    CONSTRAINT fk_reflections
        FOREIGN KEY("owner_id")
            REFERENCES users("id")
);`

executeReflections(queryTextReflections).then(result => {
    if (result) {
        console.log('Reflections table created')
        process.exit()
    }
})

module.exports = {
    executeReflections, queryTextReflections
}