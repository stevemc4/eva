import crypto from 'crypto'

/**
 * Password utility
 */
class Password{
    /**
     * Create a hashed password
     * @param {string} password Plain text password
     */
    constructor(password){
        const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(process.env.CRYPTO), 'as')
        const hash = crypto.createHash('sha256')
        this.value = hash.update(cipher.update(password).toString('hex'))
            .digest().toString('hex')
    }
    compareTo(otherPassword){
        if(otherPassword == this.value)
            return true
        else return false
    }
}

export default Password