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
     * Get all instances from database
     * @returns {(Class)} Class instance
     */
    static async findAll(){
        let temp = []
        let c = await db('classes').select('class')
        for(let item of c)
        {
            temp.push(new Class(item))
        }
        return temp
    }

    /**
     * Get an instance from database by ID
     * @param {string} [id] Object ID to find
     * @returns {(Class)} Class instance
     */
    static async findById(id){
        let c = await db('classes').select('class').where('id', id)
        return new Class(c[0])
    }

    /**
     * Get an instance from database by class name
     * @param {string} [className] Class name to find
     * @returns {(Class)} Class instance
     */
    static async findByClassName(className){
        let c = await db('classes').select('class').where('class', className)
        return new Class(c[0])
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

