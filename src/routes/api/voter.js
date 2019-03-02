import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'

import db from '../../lib/db'

import Password from '../../lib/password'
import User from '../../model/user'
import Voter from '../../model/voter'

/**
 * @type {hapi.ServerRoute[]}
 */
var routes = [
    {
        path: '/api/voter',
        method: 'POST',
        async handler(req, h){
            try{
                let newUser = new User({
                    username: req.payload.username,
                    password: req.payload.password,
                    level: 1
                })
                await newUser.save()
                console.log(newUser instanceof User)
                newUser = await User.findByUsername(req.payload.username)
                console.log(newUser)
                let newVoter = await new Voter({
                    name: req.payload.name,
                    class: req.payload.class,
                    nis: req.payload.nis,
                    user: newUser
                })
                console.log(newVoter)
                console.log('saving')
                await newVoter.save()
                return h.response({
                    statusCode: 200,
                    error: null,
                    message: 'Voter added successfully'
                }).code(200)
            }
            catch(e){
                console.log(e)
                return boom.notAcceptable('Cannot add new voter due to invalid data')
            }
        },
        options: {
            validate: {
                payload: {
                    username: joi.string().required().trim(),
                    password: joi.string().required(),
                    name: joi.string().required(),
                    class: joi.number().required(),
                    nis: joi.number().required(),
                }
            }
        },
    }
]

export default routes