import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'

import User from '../../model/user'
import Password from '../../lib/password'

/**
 * @type {hapi.ServerRoute[]}
 */
var routes = [
    {
        path: '/api/auth/login',
        method: 'POST',
        async handler(req, h){
            try{
                let user = await User.findByUsername(req.payload.username)
                let password = new Password(req.payload.password)
                if(password.compareTo(user.password)){
                    req.yar.set('id', user.id)
                    return {
                        statusCode: 200,
                        error: null,
                        message: 'Login Successful'
                    }
                }
                else
                    return boom.unauthorized('Invalid username or password')
            }
            catch(e){
                return boom.unauthorized('Invalid username or password')
            }
        },
        options: {
            validate: {
                payload: {
                    username: joi.string().required(),
                    password: joi.string().required()
                }
            }
        }
    },
    {
        path: '/api/auth/logout',
        method: 'GET',
        handler(req, h){
            req.yar.reset()
            return {
                statusCode: 200,
                error: null,
                message: ''
            }
        }
    },
    {
        path: '/api/auth/check',
        method: 'GET',
        handler(req, h){
            if(req.yar.get('id') != null){
                return {
                    statusCode: 200,
                    error: null,
                    message: ''
                }
            }
            else{
                return boom.unauthorized()
            }
        }
    }
]

export default routes