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
                if(data.class instanceof Class)
                    this.class = data.class
                else
                    this.class = await Class.findById(data.class)
                if(data.user instanceof User)
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
            let c = await db('voter').select()
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
            let c = await db('voter').select()
            .where('id', id)
            return new Voter(c[0])
        }
        catch(e){
            throw e
        }
    }

    /**
     * Get an instance from database by User ID
     * @param {number} id User ID
     * @returns {Voter} Voter instance
     */
    static async findByUserId(id){
        try{
            let c = await db('voter').select()
            .where('user', id)
            return new Voter(c[0])
        }
        catch(e){
            throw e
        }
    }

    sanitize(){
        let newInstance = this
        delete newInstance.user.password
        return newInstance
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