const Pool = require('pg').Pool

const pool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "project_db",
    password : "mampang2",
    port : 5432
});

module.exports = pool;