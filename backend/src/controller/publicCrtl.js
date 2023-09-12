const request = require('../db/request')
const responseMessage = require('../functions/readMessage')
const CustomError = require('../functions/customErr')
const utils = require('../functions/utils')

exports.getGroupes = async (req)=> {
    try{
        const query = `SELECT * FROM organizations WHERE type = 'group' AND isActive=1;`

        const result = await request(query,[],req)

        return result;

    }catch(err){throw err}
}

exports.getAssociations = async (req)=> {
    try{
        const query = `SELECT * FROM organizations WHERE type = 'association' AND isActive=1;`

        const result = await request(query,[],req)

        return result;

    }catch(err){throw err}
}

exports.getAcademies = async (req)=> {
    try{
        const query = `SELECT * FROM organizations WHERE type = 'academy AND isActive=1';`

        const result = await request(query,[],req)

        return result;

    }catch(err){throw err}
}

exports.getUser = async (req , values) => {
    try{

        const query = 'SELECT first_name, last_name, email, phone FROM asan_melody.users where username = ?;'

        const result = await request(query , [values.username] , req)

        return result

    }catch(err){throw err}
}