import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'

import Password from '../../lib/password'
import User from '../../model/user'

/**
 * @type {hapi.ServerRoute[]}
 */
var routes = [
    {
        path: '/api/user',
        method: 'POST',
        async handler(req, h){
            try{
                let newUser = new User(req.payload)
                await newUser.save()
                return h.response({
                    statusCode: 200,
                    error: null,
                    message: 'User added successfully'
                }).code(200)
            }
            catch(e){
                return boom.notAcceptable('Cannot add new user due to invalid data')
            }
        },
        options: {
            validate: {
                payload: {
                    username: joi.string().required().trim(),
                    password: joi.string().required(),
                    level: joi.number().required()
                }
            }
        },
    }
]

export default routes