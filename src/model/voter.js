import db from '../lib/db'
import Class from './class'
import User from './user'

/**
 * Voter Class
 */
class Voter{
    /**
     * Create new Voter instance
     * @param {object} data Initial data
     * @param {string} data.name Voter's name
     * @param {Class | number}  data.class Voter's class
     * @param {string} data.nis Voter's student id (NIS)
     * @param {User | number} data.user Voter's user object
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
                if((typeof data.user) == User)
                    this.user = data.user
                else
                    this.user = await User.findById(data.user)
                this.nis = data.nis
                resolve(this)
            }
            catch(e){
                reject(e)
            }
        })
    }

    /**
     * Get all instances from database
     * @returns {Voter[]} Voter instances
     */
    static async findAll(){
        try{
            let temp = []
            let c = await db('Voter').select()
            for(let item of c)
            {
                temp.push(await new Voter(item))
            }
            return temp
        }
        catch(e){
            throw e
        }
    }

    /**
     * Get an instance from database by ID
     * @param {number} id Voter Object ID
     * @returns {Voter} Voter instance
     */
    static async findById(id){
        try{
            let c = await db('Voter').select()
            .where('Voter.id', id)
            return new Voter(c[0])
        }
        catch(e){
            throw e
        }
    }

    /**
     * Creates new voter in database or updates the record if exists
     * @returns {boolean} True if action is successful
     */
    async save(){
        try{
            if(this.id == undefined)
                await db('voter').insert({
                    name: this.name, 
                    class: this.class.id,
                    user: this.user.id,
                    nis: this.nis
                    })
            else
                await db('voter').update({
                    name: this.name, 
                    class: this.class.id,
                    user: this.user.id,
                    nis: this.nis
                }).where('id', this.id)
            return true
        }
        catch(e){
            throw e
        }
    }
}

export default Voter