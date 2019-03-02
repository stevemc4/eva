import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'

import Class from '../../model/class'

/**
 * @type {hapi.ServerRoute[]}
 */
var routes = [
    {
        path: '/api/class',
        method: 'GET',
        async handler(req, h){
            let classes = await Class.findAll()
            return classes
        }
    },
    {
        path: '/api/class',
        method: 'POST',
        async handler(req, h){
            try{
                let newClass = new Class(req.payload)
                await newClass.save()
                return h.response({
                    statusCode: 200,
                    error: null,
                    message: 'Class added successfully'
                }).code(200)
            }
            catch(e){
                return boom.notAcceptable('Cannot add new class due to invalid data')
            }
        },
        options: {
            validate: {
                payload: {
                    name: joi.string().required().trim()
                }
            }
        },
    }
]

export default routes