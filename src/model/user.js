import db from './db'
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
     * Get instances from database
     * @param {string} username Username to search
     * @returns {(User | User[])} User instance
     */
    static async get(username){
        if (username != undefined){
            let c = await db('user').select().where('username', username)
            return new User(c[0])
        }
        else{
            let temp = []
            let c = await db('user').select()
            for(let item of c){
                temp.push(new User(item))
            }
            return temp
        }        
    }

    /**
     * Creates new Candidate in database or updates the record if exists
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
            return false
        }
    }
}


export default User