import db from '../lib/db'
import Class from './class'

/**
 * Candidate Class
 */
class Candidate{
    /**
     * Create new Candidate instance
     * @param {object} data Initial data
     * @param {string} data.name Candidate's name
     * @param {Class | number}  data.class Candidate's class
     * @param {string} data.vision Candidate's Vision
     * @param {string} data.mission Candidate's Mission
     * @param {string} data.quote Candidate's short quote
     * @param {string} data.image Candidate picture to show in ballot
     */
    constructor(data){
        return new Promise(async (resolve, reject) => {
            try{
                this.id = data.id || undefined
                this.name = data.name
                if((typeof data.class) == Class)
                    this.class = data.class
                else
                    this.class = await Class.findById(data.class)
                this.vision = data.vision
                this.mission = data.mission
                this.quote = data.quote
                this.image = data.image
                resolve(this)
            }
            catch(e){
                reject(e)
            }
        })
    }

    /**
     * Get all instances from database
     * @returns {Candidate[]} Candidate instances
     */
    static async findAll(){
        try{
            let temp = []
            let c = await db('candidate').select()
            for(let item of c)
            {
                temp.push(await new Candidate(item))
            }
            return temp
        }
        catch(e){
            throw e
        }
    }

    /**
     * Get an instance from database by ID
     * @param {number} id Candidate Object ID
     * @returns {Candidate} Candidate instance
     */
    static async findById(id){
        try{
            let c = await db('candidate').select()
            .where('candidate.id', id)
            return new Candidate(c[0])
        }
        catch(e){
            throw e
        }
    }

    /**
     * Creates new Candidate in database or updates the record if exists
     * @returns {boolean} True if action is successful
     */
    async save(){
        try{
            if(this.id == undefined)
                await db('candidate').insert({
                    name: this.name, 
                    class: this.class.id, 
                    vision: this.vision, 
                    mission: this.mission, 
                    quote: this.quote, 
                    image: this.image})
            else
                await db('candidate').update({
                    name: this.name,
                    class: this.class.id,
                    vision: this.vision,
                    mission: this.mission,
                    quote: this.quote,
                    image: this.image
                }).where('id', this.id)
            return true
        }
        catch(e){
            throw e
        }
    }
}

export default Candidate