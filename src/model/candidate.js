import db from './db'
import Class from './class'

/**
 * Candidate Class
 */
class Candidate{
    /**
     * Create new Candidate instance
     * @param {object} data Initial data
     * @param {string} data.name Candidate's name
     * @param {Class}  data.class Candidate's class
     * @param {string} data.vision Candidate's Vision
     * @param {string} data.mission Candidate's Mission
     * @param {string} data.quote Candidate's short quote
     * @param {string} data.image Candidate picture to show in ballot
     */
    constructor(data){
        return new Promise((resolve, reject) => {
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
        })
    }

    /**
     * Get all instances from database
     * @returns {Candidate[]} Candidate instances
     */
    static async findAll(){
        let temp = []
        let c = await db('candidate').select(['candidate.id', 'name', 'vision', 'mission', 'quote', 'image', 'classes.class'])
        .innerJoin('classes', 'candidate.class = classes.id')
        for(let item of c)
        {
            temp.push(new Candidate(item))
        }
        return temp
    }

    /**
     * Get an instance from database by ID
     * @param {number} [id] Candidate Object ID
     * @returns {Candidate} Candidate instance
     */
    static async findById(id){
        let c = await db('candidate').select(['candidate.id', 'name', 'vision', 'mission', 'quote', 'image', 'classes.class'])
        .innerJoin('classes', 'candidate.class = classes.id')
        .where('candidate.id', id)
        return new Candidate(c[0])
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
            return false
        }
    }
}

export default Candidate