const crypto = require('crypto')
const { config } = require('dotenv')
const { json } = require('express')

require('dotenv').config()
const SECRET = process.env.MESSAGE_KEY

 const private = ( user ) => {

    user = JSON.stringify(user)

    const iv = Buffer.from(crypto.randomBytes(16))
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET), iv)
    let encrypted = cipher.update(user)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return `${iv.toString('base64url')}:${encrypted.toString('base64url')}`
}

const decrypt = (private) => {
    const [ iv,  encrypted ] = ( private.split(':') )
    const ivBuffer = Buffer.from(iv, 'base64url')
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET), ivBuffer)
    let content = decipher.update(Buffer.from(encrypted, 'base64url'))
    content = Buffer.concat([content, decipher.final()])
    return content.toString()

} 



module.exports = {
    private, 
    decrypt
}

