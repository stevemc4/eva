import knex from 'knex'



async function createDatabase(username, password)
{
    console.log('Creating database...')
    let db = knex({
        connection: {
            user: username,
            password,
            host: 'localhost'
        },
        client: 'mysql2'
    })
    await db.raw('create database evadb;')
    console.log('Database created')
    db = knex({
        connection: {
            user: username,
            password,
            host: 'localhost',
            database: 'evadb'
        },
        client: 'mysql2'
    })
    console.log('Creating tables...')
    
    db.schema.createTable('user', (table) => {
        table.increments('id').primary()
        table.string('username', 64).unique()
        table.string('password').notNullable()
        table.integer('level')
    })
    .createTable('classes', (table) => {
        table.increments('id').primary()
        table.string('class').index().notNullable()
    })
    .createTable('voter', (table) => {
        table.increments('id').primary()
        table.string('nis', 12).unique().notNullable()
        table.integer('userId').unsigned().notNullable().unique().references('id').inTable('user')
        table.string('name').notNullable()
        table.integer('class').unsigned().references('id').inTable('classes').notNullable()
    })
    .createTable('candidate', (table) => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('class').unsigned().references('id').inTable('classes')
        table.string('vision').notNullable()
        table.text('mission').notNullable()
        table.string('quote').notNullable()
        table.string('image').notNullable().defaultTo('default.png')
    })
    .createTable('votes', (table) => {
        table.increments('id').primary()
        table.dateTime('votedAt').notNullable().defaultTo(db.fn.now())
        table.integer('voter').unsigned().notNullable().references('id').inTable('voter')
        table.integer('votedTo').unsigned().notNullable().references('id').inTable('candidate')
        table.string('signature', 512).notNullable()
    }).then(() => {
        console.log('Tables created')
        return true
    })
}

export default {
    createDatabase
}