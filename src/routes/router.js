import hapi from 'hapi'
import boom from 'boom'
import os from 'os'
import candidate from './api/candidate'
import user from './api/user'

/**
 * @type {hapi.ServerRoute[]}
 */
var routes = [
    ...candidate,
    ...user,
    {
        path: '/{path*}',
        method: 'GET',
        handler(req, h) {
            return h.file(process.cwd() + '/views/index.html')
        }
    },
    {
        path: '/static/{path*}',
        method: 'GET',
        handler(req, h) {
            try
            {
                return h.file(process.cwd() + '/static/' + req.params.path)
            }
            catch(e)
            {
                return boom.notFound(`File '${req.params.path}' not found`)
            }
        }
    },
    {
        path: '/api/serverinfo',
        method: 'GET',
        handler(req, h){
            return {
                os: os.platform(),
                arch: os.arch(),
                version: os.release(),
                nodever: process.version,
                hostname: os.hostname()
            }
        }
    }
]


export default routes