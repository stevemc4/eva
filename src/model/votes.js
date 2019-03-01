import db from '../lib/db'
import Class from './class'
import Voter from './voter'
import Candidate from './candidate'

/**
 * Votes Class
 */
class Votes{
    /**
     * Create new Votes instance
     * @param {object} data Initial data
     * @param {Date} data.votedAt Vote time
     * @param {Voter | number} data.voter Voter object
     * @param {Candidate | number} data.votedTo Voted candidate
     * @param {string} data.signature Vote signature
     */
    constructor(data){
        return new Promise(async (resolve, reject) => {
            try{
                this.id = data.id || undefined
                this.votedAt = data.votedAt
                this.signature = data.signature
                if((typeof data.voter) == Voter)
                    this.voter = data.voter
                else
                    this.voter = await Voter.findById(data.voter)
                if((typeof data.votedTo) == Candidate)
                    this.votedTo = data.votedTo
                else
                    this.votedTo = await Candidate.findById(data.votedTo)
                resolve(this)
            }
            catch(e){
                reject(e)
            }
        })
    }

    /**
     * Get all instances from database
     * @returns {Votes[]} Votes instances
     */
    static async findAll(){
        try{
            let temp = []
            let c = await db('votes').select()
            for(let item of c)
            {
                temp.push(await new Votes(item))
            }
            return temp
        }
        catch(e){
            throw e
        }
    }

    /**
     * Get an instance from database by ID
     * @param {number} id Votes Object ID
     * @returns {Votes} Votes instance
     */
    static async findById(id){
        try{
            let c = await db('votes').select()
            .where('id', id)
            return new Votes(c[0])
        }
        catch(e){
            throw e
        }
    }

    /**
     * Creates new Votes in database or updates the record if exists
     * @returns {boolean} True if action is successful
     */
    async save(){
        try{
            if(this.id == undefined)
                await db('votes').insert({
                    votedAt: this.votedAt,
                    voter: this.voter.id,
                    votedTo: this.votedTo.id,
                    signature: this.signature
                })
            else
                await db('votes').update({
                    votedAt: this.votedAt,
                    voter: this.voter.id,
                    votedTo: this.votedTo.id,
                    signature: this.signature
                }).where('id', this.id)
            return true
        }
        catch(e){
            throw e
        }
    }
}

export default Votes