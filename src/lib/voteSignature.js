import crypto from 'crypto'

class VoteSignature{
    /**
     * Decrypts a vote's signature
     * @param {string} signature Vote signature
     * @returns {object} Parsed signature
     */
    static decrypt(signature){
        let parsedSignature = signature.split(/\./g)
        let cipher = Buffer.from(parsedSignature[0], 'hex')
        let key = Buffer.from(parsedSignature[1], 'hex')
        let iv = Buffer.from(parsedSignature[2], 'hex')
        let length = Number.parseInt(parsedSignature[3])
        let decipherer = crypto.createDecipheriv('aes-256-gcm', key ,iv)
        let content = Buffer.from(decipherer.update(cipher)).toString('utf8', 0, length)
        return JSON.parse(content)
    }
}

export default VoteSignature