import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'
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
            try{
                let newCandidate = await new Candidate(req.payload)
                await newCandidate.save()
                return h.response({
                    statusCode: 200,
                    error: null,
                    message: 'Candidate added successfully'
                }).code(200)
            }
            catch(e){
                return boom.notAcceptable('Cannot add new candidate due to invalid data')
            }
        },
        options: {
            validate: {
                payload: {
                    name: joi.string().required().trim(),
                    class: joi.number().required(),
                    vision: joi.string().required().trim(),
                    mission: joi.string().required().trim(),
                    quote: joi.string().required().trim()
                }
            }
        }
    },
    {
        path: '/api/candidates/{id}',
        method: 'GET',
        async handler(req, h){
            try{
                let data = await Candidate.findById(req.params.id)
                return data
            }
            catch(e){
                return boom.notFound()
            }
        }
    }
]

export default routes