import dotenv from 'dotenv'
import chalk from 'chalk'

import hapi from 'hapi'
import inert from 'inert'
import yar from 'yar'

import router from './routes/router'
import installer from './install/installer'

dotenv.config()

/**
 * Server instance
 */
const server = new hapi.Server({
    port: process.env.PORT,
    routes: {
        cors: {
            origin: ['*'],
            credentials: true
        },
        validate: {
            failAction(req, h, err){
                throw err
            }
        }
    },
})

server.route(router)

/**
 * Provision the server and starts it
 */
async function provision(){
    await server.register(inert)
    await server.register({
        plugin: yar,
        options: {
            cookieOptions: {
                isSecure: false,
                password: process.env.CRYPTO,
                path: '/',
                isSameSite: false,
            },
            name: 'eva-sess',
            storeBlank: false
        }
    })

    server.start()

    console.log(`Server started on port ${chalk.green.bold(server.settings.port)}`)
}

provision()