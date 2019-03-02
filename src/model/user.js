import db from '../lib/db'
import password from '../lib/password'
import Password from '../lib/password';

/**
 * User Class
 */
class User{
    /**
     * Create new User instance
     * @param {object} data Initial data
     * @param {string} data.username Username
     * @param {string} data.password Password
     * @param {number} data.level User level
     */
    constructor(data){
        this.id = data.id || undefined
        this.username = data.username
        this.password = data.password
        this.level = data.level
    }

    /**
     * Get all instances from database
     * @returns {User[]} User instances
     */
    static async findAll(){
        let temp = []
        let c = await db('user').select()
        for(let item of c)
        {
            temp.push(new User(item))
        }
        return temp
    }

    /**
     * Get an instance from database by ID
     * @param {string} id Object ID to find
     * @returns {User} User instance
     */
    static async findById(id){
        let c = await db('user').select().where('id', id)
        return new User(c[0])
    }

    /**
     * Get an instance from database by Username
     * @param {string} username Username to find
     * @returns {User} User instance
     */
    static async findByUsername(username){
        let c = await db('user').select().where('username', username)
        return new User(c[0])
    }

    /**
     * Creates new User in database or updates the record if exists
     * @param {boolean} savePasswordOnUpdate Save new password to database on record update
     * @returns {boolean} True if action is successful
     */
    async save(savePasswordOnUpdate){
        try{
            if(this.id == undefined)
                await db('user').insert({
                    username: this.username,
                    password: new Password(this.password).value,
                    level: this.level
                })
            else{
                if(savePasswordOnUpdate)
                    await db('user').update({
                        username: this.username,
                        password: new Password(this.password).value,
                        level: this.level
                    }).where('id', this.id)
                else
                    await db('user').update({
                        username: this.username,
                        level: this.level
                    }).where('id', this.id)
            }
            return true
        }
        catch(e){
            throw e
        }
    }
}


export default User