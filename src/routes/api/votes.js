import hapi from 'hapi'
import boom from 'boom'
import joi from 'joi'
import crypto from 'crypto'
import VoteSignature from '../../lib/voteSignature'

import Votes from '../../model/votes'
import Voter from '../../model/voter'

/**
 * @type {hapi.ServerRoute[]}
 */
var routes = [
    {
        path: '/api/votes',
        method: 'GET',
        async handler(req, h){
            let votes = await Votes.findAll()
            return votes
        }
    },
    {
        path: '/api/votes',
        method: 'POST',
        async handler(req, h){
            try{
                let signature = req.payload.signature
                let sign = `${signature.cipher}.${signature.key}.${signature.iv}.${signature.dataLength}`
                let content = VoteSignature.decrypt(sign)
                let voter = await Voter.findByUserId(req.auth.credentials.user.id)
                let newVote = await new Votes({
                    votedAt: new Date(),
                    voter,
                    votedTo: content.candidate,
                    signature: sign
                })
                await newVote.save()
                return h.response({
                    statusCode: 200,
                    error: null,
                    message: 'Vote casted successfully'
                }).code(200)
            }
            catch(e){
                console.log(e)
                return boom.notAcceptable('Cannot cast new vote due to invalid data')
            }
            // try{
            //     let newClass = new Class(req.payload)
            //     await newClass.save()
            //     return h.response({
            //         statusCode: 200,
            //         error: null,
            //         message: 'Class added successfully'
            //     }).code(200)
            // }
            // catch(e){
            //     return boom.notAcceptable('Cannot add new class due to invalid data')
            // }
        },
        options: {
            auth: 'cAuth'
        },
    }
]

export default routes