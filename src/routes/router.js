import hapi from 'hapi'
import boom from 'boom'
import os from 'os'
import Candidate from '../model/candidate'

/**
 * @type {hapi.ServerRoute[]}
 */
var routes = [
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
    },
    {
        path: '/api/candidates',
        method: 'GET',
        async handler(req, h){
            let data = await Candidate.findAll()
            return data
        }
    }
]


export default routes