import dotenv from 'dotenv'
import chalk from 'chalk'

import hapi from 'hapi'
import inert from 'inert'

import router from './routes/router'
import installer from './install/installer'

dotenv.config()

const server = new hapi.Server({
    port: process.env.PORT,
    routes: {
        cors: true
    }
})

server.route(router)

async function provision(){
    await server.register(inert)

    server.start()

    console.log(`Server started on port ${chalk.green.bold(server.settings.port)}`)
}

provision()