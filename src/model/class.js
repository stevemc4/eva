import db from './db'

/**
 * Classes Class
 */
class Class{
    /**
     * Create new Class instance
     * @param {object} data Initial data
     * @param {string} data.class Class name
     */
    constructor(data){
        this.id = data.id || undefined
        this.className = data.class
    }

    /**
     * Get instances from database
     * @param {string} [className] Class name to find
     * @returns {(Class | Class[])} Class instance
     */
    static async get(className){
        if(className != undefined){
            let c = await db('classes').select('class').where('class', className)
            return new Class(c[0])
        }
        else{
            let temp = []
            let c = await db('classes').select('class').where('class', className)
            for(let item of c)
            {
                temp.push(new Class(item))
            }
            return temp
        }
    }

    /**
     * Creates new Class in database or updates the record if exists
     * @returns {boolean} True if action is successful
     */
    async save(){
        try{
            if(this.id == undefined){
                await db('classes').insert({class: this.className})
            }
            else
            {
                await db('classes').update({class: this.className}).where('id', this.id)
            }
            return true
        }
        catch(e){
            return false
        }
    }
}

export default Class

