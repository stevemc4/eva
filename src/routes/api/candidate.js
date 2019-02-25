import hapi from 'hapi'
import boom from 'boom'
import Candidate from '../../model/candidate'

/**
 * @type {hapi.ServerRoute[]}
 */
var routes = [
    {
        path: '/api/candidates',
        method: 'GET',
        async handler(req, h){
            let data = await Candidate.findAll()
            return data
        }
    },
    {
        path: '/api/candidates',
        method: 'POST',
        async handler(req, h){
            return req.payload
        }
    },
    
]