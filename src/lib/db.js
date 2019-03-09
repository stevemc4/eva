import knex from 'knex'
import fs from 'fs'

var config = JSON.parse(
    fs.readFileSync(process.cwd() + '/config.json').toString()
)

const db = knex({
    connection: {
        host: 'localhost',
        user: config.db.user,
        password: config.db.password,
        database: 'evadb'
    },
    client: 'mysql2'
})

export default db