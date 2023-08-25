const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const CustomError = require('../functions/customErr')

exports.signup = async (req,values) => {
    try{
        let query = `SELECT count(username) as username_number FROM users WHERE username = ? ;`
        let result = await request(query , [values.username] , req)
        
        if(result[0].username_number !== 0){
            throw new CustomError('username error' , responseMessage(3))
        }

        const hashedPassword = await bcrypt.hash(values.password, 8)
        query = `INSERT INTO users (username , first_name , last_name , email , password , role , phone) VALUES(?,?,?,?,?,'user',?)`
        result = await request(query , [values.username , values.firstName , values.lastName , values.email , hashedPassword , values.phone] , req)

        query = `SELECT * FROM users WHERE username = ? ;`
        result = await request(query , [values.username] , req)

        return result
    }catch(err){
        throw err
    }
}